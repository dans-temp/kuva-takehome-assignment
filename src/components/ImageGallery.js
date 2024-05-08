import React, { useEffect, useState } from "react";
import { getEvents } from "../functions/apiFunctions";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const data = await getEvents();
        setAllImages(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery-container">
      <h1 className="page-title">IMAGE GALLERY</h1>
      {error && <div className="error-message">Error: {error.message}</div>}
      {isLoading && 
            <div className="loading-box">
                <h1>LOADING...</h1>
                <div className="loading-spinner"></div>
            </div>}
      {!isLoading && (
        <div className="image-grid">
          {allImages.map((image, index) => (
            <div
              key={index}
              className="image-item"
              onClick={() => handleImageClick(image)}
            >
              <img src={image.jpg} alt={`${index}`} />
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <div className="overlay" onClick={handleCloseImage}>
          <img src={selectedImage.jpg} alt="Selected" className="large-image" />
          <div className="close-button" onClick={handleCloseImage}>×</div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
