import React from "react";
import Room from "./room";

function RoomContainer({ rooms }) {
  return (
    <div>
      {rooms && rooms.map((room, index) => <Room room={room} key={index} />)}
    </div>
  );
}

export default RoomContainer;
