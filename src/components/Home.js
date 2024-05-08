import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <img className="icon" alt="icon" src="/Assets/display-images/icon.png"></img>
        <h1 className="title">Kuva Take Home Assignment</h1>
        <h2 className="subtitle">Project By Dan Goresht</h2>
        
        <div className="description">
            <p>Welcome to my submission for the take home interview assignment. </p>
            <p>You can use the navigation bar on the left to get started, 
            or click one of these
            buttons below 
            </p>
        </div>
        
        <div className="buttons-container">
            <Link to="/image-viewer"><button className="button">IMAGE VIEWER</button></Link>
            <Link to="/image-gallery"><button className="button">IMAGE GALLERY</button></Link>
        </div>
    </div>
  );
};

export default Home;
