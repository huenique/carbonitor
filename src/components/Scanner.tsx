import React, { useCallback, useRef, useState } from 'react';
import { Camera as ReactCamera, CameraType } from 'react-camera-pro';
import { FaCamera, FaPlus, FaRedo } from 'react-icons/fa';

import { Box, IconButton, Spinner } from '@chakra-ui/react';

interface ScannerProps {
  imgSrc: string | null;
  setImgSrc: (imgSrc: string | null) => Promise<boolean>;
  saveImageSrc: () => Promise<boolean>;
  scale?: number;
  previewElement?: JSX.Element;
}

export default function Scanner(props: ScannerProps) {
  const cameraRef = useRef<CameraType | null>(null);
  const [loading, setLoading] = useState(false);

  const capture = useCallback(async () => {
    setLoading(true);

    if (!cameraRef.current) {
      setLoading(false);
      console.error('Webcam not initialized');
      return;
    }

    await props.setImgSrc(cameraRef.current.takePhoto());
    setLoading(false);
  }, [props]);

  const reset = useCallback(async () => {
    await props.setImgSrc(null);
  }, [props]);

  const renderPreview = () => {
    if (props.previewElement) {
      return props.previewElement;
    }
    return <img src={props.imgSrc ?? ''} alt="Captured" />;
  };

  return (
    <Box
      sx={{
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
          h="full"
          w="full"
        >
          <ReactCamera
            ref={cameraRef}
            facingMode="environment"
            aspectRatio={9 / 16}
            errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: undefined,
              canvas: undefined,
            }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
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
                  size="lg"
                />
                <IconButton
                  aria-label="Add"
                  onClick={props.saveImageSrc}
                  disabled={!props.imgSrc}
                  icon={<FaPlus />}
                  size="lg"
                />
              </>
            ) : (
              <IconButton
                aria-label="Capture"
                onClick={capture}
                icon={<FaCamera />}
                size="lg"
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

const MemoizedScanner = React.memo(Scanner);

export { MemoizedScanner as Scanner };
