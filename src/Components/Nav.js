import React from 'react';
import logo from '../android-icon-48x48.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({libraryStatus,setLibraryStatus}) => {
  return (
    <nav>
      <h1 className="title"><img src={logo} alt="logo"/> Waves</h1>
      <button onClick={() => setLibraryStatus(! libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;
