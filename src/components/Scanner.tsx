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

/**
 * Props for the Scanner component.
 */
interface ScannerProps {
  /**
   * The image source to display.
   */
  imgSrc: string | null;

  /**
   * A callback function that sets the image source to the provided value.
   * @param imgSrc - The new image source.
   */
  setImgSrc: (imgSrc: string | null) => Promise<boolean>;

  /**
   * A callback function that saves the image source to a data store or whatever.
   */
  saveImageSrc: () => Promise<boolean>;

  /**
   * A scale to set the camera size to.
   */
  scale?: number;

  /**
   * A custom preview element to display instead of the camera.
   */
  previewElement?: JSX.Element;
}

export default function Scanner(props: ScannerProps) {
  const scale = props.scale || CAMERA_SCALE_FACTOR;
  const webcamRef = useRef<Webcam>(
    null as unknown as HTMLVideoElement & Webcam
  );
  const [windowDimensions, setWindowDimensions] = useState(
    getComputedCamSize(scale)
  );

  // spinner
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getComputedCamSize(scale));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

  const reset = useCallback(async () => {
    await props.setImgSrc(null);
  }, [props]);

  const capture = useCallback(async () => {
    setLoading(true);
    await props.setImgSrc(webcamRef.current.getScreenshot());
    setLoading(false);
  }, [props]);

  const renderPreview = () => {
    // If a custom preview element is provided, use it
    if (props.previewElement) {
      return props.previewElement;
    }
    // Otherwise, fall back to a standard image display
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
            videoConstraints={windowDimensions}
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
