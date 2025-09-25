const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config({ path: "../.env" });

const abiFile = require("./NFTTicket_abi.json");
const abi = abiFile.abi;   // ✅ lấy đúng ABI

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Private key account #0
  provider
);

console.log("Loaded CONTRACT_ADDR =", process.env.CONTRACT_ADDR);

const contract = new ethers.Contract(process.env.CONTRACT_ADDR, abi, wallet);

app.get("/events/:id", async (req, res) => {
  try {
    const e = await contract.eventsById(req.params.id);
    res.json(e);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log("API server running on :4000"));
