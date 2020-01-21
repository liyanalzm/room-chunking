import React, { useState } from "react";
import "./styles.css";
import Rooms from "./Rooms";

const adult = require("./pax/adult.json");
const child = require("./pax/child.json");

const chunkPax = (paxes, room, roomCount) => {
  let index = 0;
  paxes.forEach(pax => {
    // Resetting the index once reached the max roomCount and goes back to first index
    if (index === roomCount) {
      index = 0;
    }

    room[index] = {
      roomNum: index + 1,
      paxes: room[index] ? [...room[index].paxes, pax] : [pax]
    };

    index++;
  });
  return room;
};

const getChunkedPax = roomCount => {
  let room = [];

  room = chunkPax(adult, room, roomCount);
  room = chunkPax(child, room, roomCount);

  return room;
};

export default function App() {
  const [roomCount, setRoomCount] = useState(1);
  const chunkedPax =
    roomCount <= adult.length ? getChunkedPax(Number(roomCount)) : null;

  const handleRoomCount = e => {
    e.stopPropagation();
    setRoomCount(e.target.value || 1);
  };

  return (
    <div className="App">
      <h1>Room chunking</h1>
      <p>
        The purpose of this app is to divide these adult and children into the
        given number of rooms. You can change the paxes data in{" "}
        <i>./pax.adult.json</i> and <i>./pax.child.json</i>
        <br /> <br />
        <b>Rules are per below:</b>
      </p>
      <ol>
        <li>Children must not be alone in one room (must have an adult)</li>
        <li>Each room must contain at least 1 adult</li>
      </ol>
      <hr />
      <div style={{ marginTop: "16px" }}>
        <label for="roomCount" style={{ marginRight: "8px" }}>
          Number of rooms
        </label>
        <input
          type="number"
          id="roomCount"
          value={roomCount}
          onChange={handleRoomCount}
          min={1}
          max={adult.length}
        />
      </div>
      <Rooms rooms={chunkedPax} />
    </div>
  );
}
