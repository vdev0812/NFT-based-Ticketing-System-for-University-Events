import React, { useState } from "react";

function ScanTicket() {
  const [tokenId, setTokenId] = useState("");
  const [message, setMessage] = useState("");

  const scanTicket = async () => {
    try {
      const res = await fetch("http://localhost:4000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: parseInt(tokenId) }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Ticket #${tokenId} checked in successfully!`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to scan ticket.");
    }
  };

  return (
    <div>
      <h2>✅ Scan Ticket</h2>
      <input
        type="number"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={scanTicket}>Scan</button>
      <p>{message}</p>
    </div>
  );
}

export default ScanTicket;
