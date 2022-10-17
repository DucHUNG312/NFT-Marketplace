import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecretkey = process.env.NEXT_PUBLIC_INFURA_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretkey}`).toString(
  "base64"
)}`;
const subdomain = process.env.NEXT_PUBLIC_INFURA_SUBDOMAIN;

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// Fetching smartcontract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

// Connecting with smartcontract
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong when connecting with smartcontract");
  }
};

export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect and sell NFTs";

  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();

  // Check if wallet is connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return (
          setOpenError(true),
          setError(
            "No provider found! You might want to install Metamask extension to connect your wallet"
          )
        );

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setOpenError(true);
        setError("No account found! You might want to login to your Metamask");
      }
    } catch (error) {
      setError("Something went wrong when connecting with wallet");
      setOpenError(true);
    }
  };

  //   useEffect(() => {
  //     checkIfWalletConnected();
  //   }, []);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return (
          setOpenError(true),
          setError(
            "Please install MetaMask extension to connect to your wallet!"
          )
        );
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts.length) {
        setOpenError(true);
        setError("No account found! You might want to login to your Metamask");
      } else {
        setCurrentAccount(accounts[0]);
      }
      //window.location.reload();
    } catch (error) {
      setError("Eror while connecting to wallet");
      setOpenError(true);
    }
  };

  // Upload to IPFS function
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Eror while uploading to IPFS");
      setOpenError(true);
    }
  };

  // Create NFT function
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price)
      return (
        setOpenError(true),
        setError("Makesure you entered all the required field!")
      );
    if (!image) {
      return setOpenError(true), setError("Missing file to create NFT!");
    }
    const data = JSON.stringify({ name, description, image });
    try {
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      await createSale(url, price);
      router.push("/search");
    } catch (error) {
      setError("Eror while creating NFT");
      setOpenError(true);
    }
  };

  // createSale function
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();
      const listingFee = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingFee.toString(),
          })
        : await contract.reSellToken(id, price, {
            value: listingFee.toString(),
          });

      await transaction.wait();

      //alert("Create NFT successfully! Go to search page to see the result");
    } catch (error) {
      setError("Eror while creating sale item");
      setOpenError(true);
    }
  };

  // fetchNFT function
  const fetchNFTs = async () => {
    try {
      if (currentAccount) {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const data = await contract.fetchMarketItem();
        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );
              return {
                price,
                tokenId: tokenId.toNumber(),
                owner,
                image,
                name,
                description,
                seller,
                tokenURI,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {
      setError(
        "Infura service is busy! Please try to reload your page or wait a few minutes"
      );
      setOpenError(true);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  // fetching my nft or listed nft
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();
        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFT();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );
              return {
                price,
                tokenId: tokenId.toNumber(),
                owner,
                image,
                name,
                description,
                seller,
                tokenURI,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {
      setError("Eror while fetching listed items");
      setOpenError(true);
    }
  };

  // Buy NFT function
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
      router.push("/author-profile");
    } catch (error) {
      setError("Eror while buying items");
      setOpenError(true);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        connectWallet,
        uploadToIPFS,
        createNFT,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        checkIfWalletConnected,
        buyNFT,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
