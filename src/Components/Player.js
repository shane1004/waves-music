import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay , faPause , faAngleLeft , faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({songs, setSongs,audioRef,currentSong,setCurrentSong, isPlaying, setisPlaying, songInfo , setSongInfo}) => {

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if(song.id === nextPrev.id) {
          return {
              ...song,
              active: true,
          };
      }
      else{
          return {
              ...song,
              active: false,
          };
      }
  });
  setSongs(newSongs);
}

  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    }
    else{
      audioRef.current.play();
      setisPlaying(!isPlaying);
    }
  }

  const getTime = (time) => {
    return(
      Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...setSongInfo,currentTime : e.target.value , duration : e.target.duration || dur()})
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

    if (direction==="skip-forward")
    {
      await setCurrentSong(songs[(currentIndex + 1)%songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1)%songs.length])
    }

    if (direction==="skip-back")
    {
      await setCurrentSong(songs[(songs.length + currentIndex - 1)%songs.length]);
      activeLibraryHandler(songs[(songs.length + currentIndex - 1)%songs.length])
    }

    if(isPlaying) audioRef.current.play();
  };

  //slider error fix
  const dur = () => {
    return (audioRef.current.duration)
  };

  return (
    <div className = "player">
      <div className="time-control">
         <p>{getTime(songInfo.currentTime)}</p>

         <input min={0} 
         max={songInfo.duration || 0} 
         value={songInfo.currentTime} 
         onChange={dragHandler}
         type="range"
         />

         <p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
      </div>
      <div className="play-control">
          <FontAwesomeIcon 
          onClick={() => skipTrackHandler('skip-back')} //if we don't invoke function it will be an immediate change
          className="skip-back" 
          size="2x" 
          icon={faAngleLeft} 
          />
          
          <FontAwesomeIcon 
          onClick={playSongHandler}
          className="play"
          size="2x" 
          icon={isPlaying ? faPause : faPlay} 
          />

          <FontAwesomeIcon 
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward" 
          size="2x" 
          icon={faAngleRight} 
          />

      </div>
    </div>
  )
}

export default Player;
