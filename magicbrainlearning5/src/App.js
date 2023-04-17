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
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
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
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        this.setFaceBox(this.calculateFaceLocation(response))
      }
    })
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

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
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
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageFormInput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <DetectFace linkURL={linkURL} box={box}/>
              </div>
            : ( route === 'signin' 
                  ? <SignInForm onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                  : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )           
        }
      </div>
    )
  }
}

export default App;
