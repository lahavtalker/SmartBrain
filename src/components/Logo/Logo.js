import React from "react";
import Tilt from "react-tilt";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div className="center ma4 mt0">
      <Tilt
        className="Tilt br2"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img src={logo} alt="logo" style={{ paddingTop: "5px" }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
