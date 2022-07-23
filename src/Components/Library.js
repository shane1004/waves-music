import React from 'react';
import LibrarySong from './LibrarySong';

function Library({audioRef, songs,setSongs,setcurrentSong,isPlaying,libraryStatus}) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map(song => 
        <LibrarySong 
        audioRef={audioRef}
        setcurrentSong={setcurrentSong} 
        song={song} 
        key={song.id}
        id={song.id}
        isPlaying={isPlaying}
        songs={songs}
        setSongs={setSongs}
        />)}
      </div>
    </div>
  )
}

export default Library;
