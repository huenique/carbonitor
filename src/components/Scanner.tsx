import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCamera, FaPlus, FaRedo } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { Box, IconButton, Spinner } from '@chakra-ui/react';

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

interface ScannerProps {
  imgSrc: string | null;
  setImgSrc: (imgSrc: string | null) => Promise<boolean>;
  saveImageSrc: () => Promise<boolean>;
  scale?: number;
  previewElement?: JSX.Element;
}

export default function Scanner(props: ScannerProps) {
  const scale = props.scale || CAMERA_SCALE_FACTOR;
  const webcamRef = useRef<Webcam>(null);
  const [windowDimensions, setWindowDimensions] = useState(
    getComputedCamSize(scale)
  );
  const [videoConstraints, setVideoConstraints] = useState({
    ...windowDimensions,
    facingMode: 'environment',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getComputedCamSize(scale));
    }

    function handleOrientationChange() {
      // Update video constraints here based on new orientation
      // This is an example, you may need to adjust based on actual orientation values
      setVideoConstraints({
        ...getComputedCamSize(scale),
        facingMode: 'environment',
      });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('deviceorientation', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('deviceorientation', handleOrientationChange);
    };
  }, [scale]);

  const reset = useCallback(async () => {
    await props.setImgSrc(null);
  }, [props]);

  const capture = useCallback(async () => {
    setLoading(true);
    if (!webcamRef.current) {
      setLoading(false);
      console.error('Webcam not initialized');
      return;
    }

    await props.setImgSrc(webcamRef.current.getScreenshot());
    setLoading(false);
  }, [props]);

  const renderPreview = () => {
    if (props.previewElement) {
      return props.previewElement;
    }
    return (
      <img
        src={props.imgSrc ?? ''}
        alt="Captured"
        style={{
          width: windowDimensions.width,
          height: windowDimensions.height,
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      {props.imgSrc ? (
        renderPreview()
      ) : (
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
            videoConstraints={videoConstraints}
            screenshotFormat="image/webp"
            height={windowDimensions.height}
            width={windowDimensions.width}
          />
        </Box>
      )}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {props.imgSrc ? (
              <>
                <IconButton
                  aria-label="Reset"
                  onClick={reset}
                  icon={<FaRedo />}
                />
                <IconButton
                  aria-label="Add"
                  onClick={props.saveImageSrc}
                  disabled={!props.imgSrc}
                  icon={<FaPlus />}
                />
              </>
            ) : (
              <IconButton
                aria-label="Capture"
                onClick={capture}
                icon={<FaCamera />}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const MemoizedScanner = React.memo(Scanner);

export { MemoizedScanner as Scanner };
