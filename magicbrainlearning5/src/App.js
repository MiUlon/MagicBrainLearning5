import React, { Component } from 'react';
import SignOut from './Components/SignOut/SignOut';
import SignInForm from './Components/SignInForm/SignInForm';
import Register from './Components/Register/Register';
import LogoImage from './Components/LogoImage/LogoImage';
import Rank from './Components/Rank/Rank';
import ImageFormInput from './Components/ImageFormInput/ImageFormInput';
import DetectFace from './Components/DetectFace/DetectFace';
import './App.css';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';

window.process = {};

const app = new Clarifai.App({
  apiKey: '82819b6c8d2d4417abbdebb80e6a3cdc'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      linkURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: width * clarifaiFace.left_col,
      topRow: height * clarifaiFace.top_row,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  setFaceBox = (box) => {
    this.setState({box: box})
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({linkURL: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
    .then(response => this.setFaceBox(this.calculateFaceLocation(response)))
    .catch(error => console.log(error))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  };

  render() {
    const { isSignedIn, route, linkURL, box } = this.state;
    return (
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} />
        <SignOut onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
            ? <div>
                <LogoImage />
                <Rank />
                <ImageFormInput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <DetectFace linkURL={linkURL} box={box}/>
              </div>
            : ( route === 'signin' 
                  ? <SignInForm onRouteChange={this.onRouteChange} />
                  : <Register onRouteChange={this.onRouteChange} />
            )           
        }
      </div>
    )
  }
}

export default App;
