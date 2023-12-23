import { Button, Image } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CAMERA_SCALE_FACTOR = 1.3;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function getComputedCamSize() {
  const { width, height } = getWindowDimensions();
  return {
    width: Math.floor(width / CAMERA_SCALE_FACTOR),
    height: Math.floor(height / CAMERA_SCALE_FACTOR),
  };
}

const buttonStyle = { width: '50%' };

export default function ScanPage() {
  const webcamRef = useRef<Webcam>(
    null as unknown as HTMLVideoElement & Webcam
  );
  const [imgSrc, setImgSrc] = useState(
    null as unknown as string | null | undefined
  );
  const [windowDimensions, setWindowDimensions] = useState(
    getComputedCamSize()
  );

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getComputedCamSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        forceScreenshotSourceSize={true}
        videoConstraints={windowDimensions}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          style={buttonStyle}
          color="warning"
          onClick={() => setImgSrc(null)}
        >
          Reset
        </Button>
        <Button style={buttonStyle} color="primary" onClick={capture}>
          Take photo
        </Button>
      </div>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt="Captured"
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}
    </div>
  );
}
