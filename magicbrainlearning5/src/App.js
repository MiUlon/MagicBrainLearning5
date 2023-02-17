import React, { Component } from 'react';
import SignOut from './Components/SignOut/SignOut';
import LogoImage from './Components/LogoImage/LogoImage';
import './App.css';
import ParticlesBg from 'particles-bg';

class App extends Component {
  render() {
    return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />
        <SignOut />
        <LogoImage />
      </div>
    )
  }
}

export default App;
