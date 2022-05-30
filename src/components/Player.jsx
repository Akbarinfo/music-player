import React, { useEffect, useRef, useState } from "react";
//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from "./Until";

export default function Player({
  currentSong,
  isPlaying,
  setPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  timeUpdateHandler,
  songs,
  setCurrentSong,
  setSongs
}){

  useEffect(() => {
    const newSongs = songs.map((song) => {
      if(song.id === currentSong.id) {
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

    playAudio(isPlaying, audioRef);

  }, [currentSong])


  const getTime = (time) => {
    if(time) {
      return(
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      )
    } else {
      return '0:00'
    }
  }

  let playSongHander = () => {
    if(isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
     setPlaying(! isPlaying)
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo, current: e.target.value})
  }

  const skipTrackHandler = async (track) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if(track === 'player__icon-right') {
     await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    if(track === 'player__icon-left') {
      if((currentIndex - 1) % songs.length === - 1 ) {
        setCurrentSong(songs[songs.length - 1])
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }

  }

  const trackAnime = {
    transform: `translateX(${songInfo.animatePercentage}%)`
  }

  const songEngHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    setCurrentSong(songs[(currentIndex + 1) % songs.length])
  }

  return(
    <div className="player">
      <div className="player__timebox">
        <p className="player__start-time">{getTime(songInfo.current)}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`}} className="player__track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.current}
            type="range"
            onChange={dragHandler} />
            <div style={trackAnime} className="player__animate"></div>
        </div>
        <p className="player__end-time">{getTime(songInfo.duration)}</p>
      </div>
      <div className="player__play">
        <FontAwesomeIcon onClick={() => skipTrackHandler('player__icon-left')} className="player__icon-left" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHander} className="player__icon-play" size="2x" icon={isPlaying ?  faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler('player__icon-right')} className="player__icon-right" size="2x" icon={faAngleRight} />
      </div>

      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEngHandler}
        ></audio>

    </div>
  )
}