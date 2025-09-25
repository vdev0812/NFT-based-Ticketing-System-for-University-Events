import React, { useState } from "react";
import EventList from "./components/EventList";
import BuyTicket from "./components/BuyTicket";
import ScanTicket from "./components/ScanTicket";
import "./styles.css";

function App() {
  const [activeTab, setActiveTab] = useState("event");

  return (
    <div className="app-container">
      <header className="app-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/814/814513.png"
          alt="ticket"
          className="logo"
        />
        <h1>🎓 University NFT Ticketing System</h1>
      </header>

      <nav className="nav-bar">
        <button
          className={activeTab === "event" ? "active" : ""}
          onClick={() => setActiveTab("event")}
        >
          🎉 Event
        </button>
        <button
          className={activeTab === "buy" ? "active" : ""}
          onClick={() => setActiveTab("buy")}
        >
          🎟️ Buy Ticket
        </button>
        <button
          className={activeTab === "scan" ? "active" : ""}
          onClick={() => setActiveTab("scan")}
        >
          ✅ Scan Ticket
        </button>
      </nav>

      <main className="content">
        {activeTab === "event" && <EventList />}
        {activeTab === "buy" && <BuyTicket />}
        {activeTab === "scan" && <ScanTicket />}
      </main>
    </div>
  );
}

export default App;
