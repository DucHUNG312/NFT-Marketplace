const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const NFT = require("../../models/nftModel");
const User = require("../../models/userModel");
const Review = require("../../models/reviewModel");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
    })
    .then(() => {
        // console.log(con.connection);
        console.log("DB Connection Successfully");
    });

const nfts = JSON.parse(fs.readFileSync(`${__dirname}/nfts.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/nft-reviews.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/nft-users.json`, "utf-8"));

//IMPORT DATA
const importDate = async () => {
    try {
        await NFT.create(nfts);
        await User.create(users);
        await Review.create(reviews);
        console.log("DATA successfully Loaded");
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

//DELETE DATA
const deleteData = async () => {
    try {
        await NFT.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log("DATA successfully Deleted");
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === "--import") {
    importDate();
} else if (process.argv[2] === "--delete") {
    deleteData();
}
