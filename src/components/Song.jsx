import React from "react";
//scss

export default function Song({currentSong}) {
  return(
    <div className="song">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}