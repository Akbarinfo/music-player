import React from "react";
import { playAudio } from "./Until";

export default function LibrarySong({currentSong, setCurrentSong, songs, id, audioRef, isPlaying, setSongs}){

  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id)
    setCurrentSong(selectedSong[0])

    const newSongs = songs.map((song) => {
      if(song.id === id) {
        return {
          ...song,
          active: true
        }
      } else {
        return{
          ...song,
          active: false
        }
      }
    });

    setSongs(newSongs)

    playAudio(isPlaying, audioRef)
  }

  return (
    <div onClick={songSelectHandler} className={`library__song ${currentSong.active ? "library__active" : ""}`}>
      <img src={currentSong.cover} alt={currentSong.name} />
      <div className="library__desc">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
  </div>
  )
}