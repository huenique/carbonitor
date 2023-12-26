import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { Box, Button } from '@chakra-ui/react';

const CAMERA_SCALE_FACTOR = 1;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function getComputedCamSize(scale: number) {
  const { width, height } = getWindowDimensions();

  return {
    width: Math.floor(width / scale),
    height: Math.floor(height / scale),
  };
}

const buttonStyle = { width: '100%' };

interface ScannerProps {
  scale?: number;
  imgSrc: string;
  setImgSrc: (imgSrc: string | null) => void;
}

export default function Scanner(props: ScannerProps) {
  const scale = props.scale || CAMERA_SCALE_FACTOR;
  const webcamRef = useRef<Webcam>(
    null as unknown as HTMLVideoElement & Webcam
  );
  const [windowDimensions, setWindowDimensions] = useState(
    getComputedCamSize(scale)
  );

  const capture = useCallback(() => {
    props.setImgSrc(webcamRef.current.getScreenshot());
  }, [props]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getComputedCamSize(scale));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <Box
        borderColor="teal"
        borderWidth={4}
        borderRadius="lg"
        overflow="hidden"
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          forceScreenshotSourceSize={true}
          videoConstraints={windowDimensions}
          screenshotFormat="image/webp"
          height={windowDimensions.height}
          width={windowDimensions.width}
        />
      </Box>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button style={buttonStyle} onClick={() => console.info(props.imgSrc)}>
          Reset
        </Button>
        <Button style={buttonStyle} onClick={capture}>
          Take photo
        </Button>
      </div>
    </div>
  );
}
