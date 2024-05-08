import React from "react";
import NavigationBar from "./components/NavigationBar";
import ImageViewer from "./components/ImageViewer";
import Home from "./components/Home";
import CameraInfo from "./components/CameraInfo.js"
import ImageGallery from "./components/ImageGallery.js"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/image-viewer" element={<ImageViewer />} />
            <Route path="/camera-info" element={<CameraInfo />} />
            <Route path="/image-gallery" element={<ImageGallery />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
