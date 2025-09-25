# NFT-based Ticketing System for University Events

---

## Features
- **Organizer** can create events with name, venue, time, and price.  
- **Students** can buy tickets → each ticket is minted as an NFT to their wallet.  
- **Validators** (gate staff) can scan tickets. A ticket can be scanned **only once** (double-scan prevented).  
- **Frontend React** for user-friendly UI.  
- **Backend API** with Express + Ethers.js to interact with the smart contract.  
- **Smart Contract** in Solidity (Hardhat).  

---

## Tech Stack
- **Smart Contract**: Solidity, Hardhat, OpenZeppelin ERC721  
- **Blockchain**: Ethereum (Sepolia testnet / local Hardhat node)  
- **Backend**: Node.js, Express, Ethers.js  
- **Frontend**: React, Axios, CSS  

---

## Project Structure

```
nft-ticketing/
│── contracts/           # Solidity smart contracts
│    └── NFTTicket.sol
│── scripts/             # Deployment and helper scripts
│    ├── deploy.js
│    ├── mint.js
│    └── roles_and_scan.js
│── test/                # Unit tests with Hardhat
│    └── ticket.test.js
│── api/                 # Backend API
│    ├── index.js
│    └── NFTTicket_abi.json
│── web/                 # React frontend
│    ├── src/
│    │    ├── App.js
│    │    ├── components/
│    │    │     ├── EventList.js
│    │    │     ├── BuyTicket.js
│    │    │     └── ScanTicket.js
│    │    └── styles.css
│    └── package.json
│── hardhat.config.js
│── .env
│── package.json
```

---

## Installation & Setup

### 1. Clone repository
```bash
git clone https://github.com/vdev0812/NFT-based-Ticketing-System-for-University-Events.git
cd nft-ticketing
```

### 2. Install dependencies
```bash
npm install
```

### 3. Compile smart contract
```bash
npx hardhat compile
```

### 4. Run local blockchain (for dev)
```bash
npx hardhat node
```

### 5. Deploy contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address and update `.env`:
```
CONTRACT_ADDR=0x...deployedAddress
```

### 6. Export ABI for backend
```bash
npx hardhat export-abi > api/NFTTicket_abi.json
```

### 7. Run backend
```bash
cd api
npm install express ethers dotenv
node index.js
```
Backend runs at: **http://localhost:4000**

### 8. Run frontend
```bash
cd ../web
npm install
npm start
```
Frontend runs at: **http://localhost:3000**

---

## Security Notes
- Smart contract includes **AccessControl** and **Pausable**.  
- Validator role is required to scan tickets.  
- Double-scan prevented by `checkedIn[tokenId]`.  

---
