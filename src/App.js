import React,{useState,useRef} from 'react';

import './styles/app.scss';

import Player from "./Components/Player";
import Song from './Components/Song';
import Library from './Components/Library';
import Nav from './Components/Nav';

import data from './data';

function App() {

  const audioRef = useRef(null);
  const [songs,setSongs] = useState(data());
  const [currentSong,setcurrentSong] = useState(songs[0]);
  const [isPlaying,setisPlaying] = useState(false);

  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [libraryStatus,setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo , currentTime: current , duration : duration});
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setcurrentSong(songs[(currentIndex + 1)%songs.length]);

    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong}/>

      <Player 
      songs={songs}
      setSongs={setSongs}
      audioRef={audioRef}
      setisPlaying={setisPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}
      setCurrentSong={setcurrentSong}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      />

      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />

      <audio 
      onTimeUpdate={timeUpdateHandler} 
      onLoadedMetadata={timeUpdateHandler}
      ref={audioRef} 
      src={currentSong.audio}
      onEnded={songEndHandler}
      ></audio>

    </div>
  );
}

export default App;
