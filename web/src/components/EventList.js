import React, { useState, useEffect } from "react";

function EventList() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/events/1") // gọi API backend
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>🎉 Event Information</h2>
      {event ? (
        <div>
          <p><b>Event ID:</b> 1</p>
          <p><b>Name:</b> University Concert</p>
          <p><b>Organizer:</b> {event.organizer || "0x..."}</p>
        </div>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
}

export default EventList;
