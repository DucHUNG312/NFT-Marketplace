import "../styles/globals.css";
import { NavBar, Footer } from "../components/componentIndex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <NFTMarketplaceProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </NFTMarketplaceProvider>
    </div>
  );
};

export default MyApp;
