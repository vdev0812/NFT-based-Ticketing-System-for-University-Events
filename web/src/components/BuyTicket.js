import React, { useState } from "react";

function BuyTicket() {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const buyTicket = async () => {
    try {
      const res = await fetch("http://localhost:4000/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: 1, buyer: address }),
      });
      const data = await res.json();
      setMessage(`✅ Ticket minted! Token ID: ${data.tokenId}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to buy ticket.");
    }
  };

  return (
    <div>
      <h2>🎟️ Buy Ticket</h2>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={buyTicket}>Buy</button>
      <p>{message}</p>
    </div>
  );
}

export default BuyTicket;
