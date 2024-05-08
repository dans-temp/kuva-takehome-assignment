import React, { useEffect, useState, useRef } from "react";
import { getEvents } from "../functions/apiFunctions";
import "./ImageViewer.css";

const ImageViewer = () => {
    const [allImages, setAllImages] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDetectionFiltered, setIsDetectionFiltered] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const data = await getEvents();
                setAllImages(data);
                setDisplayImages(data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchImageData();
    }, []);

    useEffect(() => {
        if(canvasRef.current)
        {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (displayImages.length > 0) {
                for (const detection of displayImages[currentImageIndex].detectionsList)
                {
                    drawRect(detection.roicoordsList);
                }
                
            }
        }
    }, [currentImageIndex, displayImages]);

    const drawRect = (coords) => {    
        console.log(coords)
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!coords || coords.length !== 8) {
            return;
        }
    
        const [x1, y1, x2, y2, x3, y3, x4, y4] = coords;
    
        ctx.beginPath();
        ctx.moveTo(x1/1.05, y1/2.75);
        ctx.lineTo(x2/1.05, y2/2.75);
        ctx.lineTo(x3/1.05, y3/2.75);
        ctx.lineTo(x4/1.05, y4/2.75);
        ctx.closePath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    const handleFilterToggle = () => {
        setCurrentImageIndex(0);
        setIsDetectionFiltered((prev) => !prev);
        if (isDetectionFiltered) {
            setDisplayImages(allImages);
        } else {
            const onlyDetections = allImages.filter(
                (image) => image.detectionsList.length > 0
            );
            setDisplayImages(onlyDetections);
        }
    };

    return (
        <div className="image-viewer-body">
            {error && (
                <div className="error-message">
                    <h2>Error Fetching Image Data:</h2>
                    <h3>{error.message}</h3>
                </div>
            )}
            {!error && (
                <>
                    {isLoading && (
                        <div className="loading-box">
                            <h1>LOADING...</h1>
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                    {!isLoading && (
                        <div className="image-container">
                            <span
                                className="arrow left"
                                onClick={() => {
                                    if (currentImageIndex === 0) {
                                        setCurrentImageIndex(displayImages.length - 1);
                                    } else {
                                        setCurrentImageIndex(currentImageIndex - 1)
                                    }
                                }}
                            ></span>
                            <div className="image-content">
                                <div className="image-box">
                                    <h1 className="page-title">IMAGE VIEWER</h1>
                                    <label className="filter-checkbox">
                                        Only Detections:
                                        <input
                                            type="checkbox"
                                            checked={isDetectionFiltered}
                                            onChange={handleFilterToggle}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <div>
                                        Image #{currentImageIndex + 1} of{" "}
                                        {displayImages.length} Total Images
                                    </div>
                                </div>
                                <img
                                    src={displayImages[currentImageIndex].jpg}
                                    alt={`${currentImageIndex}`}
                                />
                                <canvas
                                    ref={canvasRef}
                                    className="canvas-overlay"
                                ></canvas>
                                {displayImages[currentImageIndex]?.createdOn && (
                                    <div>
                                        Scan Timestamp:{" "}
                                        {
                                            displayImages[currentImageIndex].createdOn
                                        }
                                    </div>
                                )}
                                {displayImages[currentImageIndex]?.noiseFloorMetric && (
                                    <div>
                                        Noise Floor:{" "}
                                        {displayImages[
                                            currentImageIndex
                                        ].noiseFloorMetric.toFixed(2)}
                                    </div>
                                )}
                                {(
                                    displayImages[currentImageIndex]?.overallConf ||
                                    displayImages[currentImageIndex]?.overallConf === 0
                                ) && (
                                    <div>
                                        Confidence Level:{" "}
                                        {displayImages[
                                            currentImageIndex
                                        ].overallConf.toFixed(2)}
                                    </div>
                                )}
                                {displayImages[currentImageIndex]
                                    ?.detectionsList && (
                                    <div>
                                        Number of Detections:{" "}
                                        {displayImages[currentImageIndex].detectionsList.length}
                                    </div>
                                )}
                            </div>
                            <span
                                className="arrow right"
                                onClick={() => {
                                    if (currentImageIndex === displayImages.length - 1) {
                                        setCurrentImageIndex(0);
                                    } else {
                                        setCurrentImageIndex(currentImageIndex + 1)
                                    }
                                }}
                            ></span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ImageViewer;