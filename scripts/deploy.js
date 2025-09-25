const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("NFTTicket");
  const nft = await NFT.deploy("ipfs://base/");

  await nft.waitForDeployment();

  console.log("NFTTicket deployed to:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
