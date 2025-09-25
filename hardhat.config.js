require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.ALCHEMY_RPC || "",
      accounts: process.env.PRIV_KEY ? [process.env.PRIV_KEY] : [],
    },
  },
};