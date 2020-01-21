import React from "react";

function Room({ room: { roomNum, paxes } }) {
  return (
    <div className="room">
      <h4>Room {roomNum}</h4>
      {paxes.map((p, index) => (
        <div key={index}>
          {p.name} ({p.type})
        </div>
      ))}
    </div>
  );
}

export default Room;
