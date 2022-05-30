import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus
}) {
  return (
    <div className={`library ${libraryStatus ? "library__canvas" : '' }`}>
      <h2>Library</h2>
      <div className='library__songbox'>
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            setCurrentSong={setCurrentSong}
            currentSong={song}
            songs={songs}
            setSongs={setSongs}
            id={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying} />
        ))
        }
      </div>
    </div>
  )
}