import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Particles from "react-particles-js";
import Clarifai, { FACE_DETECT_MODEL } from "clarifai";

const app = new Clarifai.App({
  apiKey: "f1efb1d6b27845338b677a7b42735a84",
});

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSumbit = () => {
    this.setState({ imageURL: this.state.input }, () => {
      app.models
        .predict(FACE_DETECT_MODEL, this.state.imageURL)
        .then((response) =>
          this.displayFaceBox(this.calculateFaceLocation(response))
        )
        .catch((err) => console.log(err));
    });
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSumbit={this.onSumbit}
            />
            <FaceRecognition
              imageURL={this.state.imageURL}
              box={this.state.box}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
