import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const CaptureImage = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={videoConstraints}
      />
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CaptureImage;
