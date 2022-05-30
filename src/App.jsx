import { useRef, useState } from 'react';
import './App.css';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import data from "./data"
function App() {
  //ref
  const audioRef = useRef(null);

  //state
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    current: 0,
    duration: 0,
    animatePercentage: 0
  });

  const [libraryStatus, setLibraryStatus] = useState(false);


  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundCurrent = Math.round(current)
    const roundDuration = Math.round(duration)

    const animate = Math.round((roundCurrent / roundDuration)*100)

    setSongInfo({...songInfo, current, duration, animatePercentage: animate })
  }

  return (
    <div className="App">
      <div className={`conatiner ${libraryStatus ? 'ml' : ''}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

        <Song currentSong={currentSong}/>
        <Player
          audioRef={audioRef}
          setPlaying={setPlaying}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          timeUpdateHandler={timeUpdateHandler}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      </div>

      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
