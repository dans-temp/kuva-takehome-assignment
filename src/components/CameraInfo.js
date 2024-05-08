import React, { useEffect, useState } from "react";
import { getCameras } from "../functions/apiFunctions";
import "./CameraInfo.css";

const CameraInfo = () => {
    const [cameraData, setCameraData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCameraData = async () => {
            try {
                const data = await getCameras();
                setCameraData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchCameraData();
    }, []);

    return (
        <div className="camera-info-container">
            {error && <div>Error: {error.message}</div>}
            <h1 className="camera-title">CAMERA INFORMATION</h1>
            {isLoading && (
                <div className="loading-box">
                    <h1>LOADING...</h1>
                    <div className="loading-spinner"></div>
                </div>
            )}
            <ul>
                {cameraData.map((camera, index) => (
                    <div className="camera-section"> 
                        <h2> Camera {index + 1}</h2>
                        <li>
                            <strong>Camera Name:</strong> {camera.tags.name}
                        </li>
                        <li>
                            <strong>Camera Organization:</strong> {camera.tags.organization}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default CameraInfo;
