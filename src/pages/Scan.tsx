import localforage from 'localforage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useBreakpointValue } from '@chakra-ui/react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  HStack,
  Heading,
  Highlight,
  Image,
  Stack,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from '@chakra-ui/react';

import { Scanner } from '../components/Scanner';
import { APP_NAME, DB_STORE } from '../config';
import { UserConstructor, UserWaste } from '../db';
import { useUser } from '../hooks/useUser';
import { connect, invoke } from '../services/nyckel';
import { calculateTotalCO2e } from '../utils/co2e';

const MIN_ACCEPTABLE_CONFIDENCE = 0.9;

const PLASTIC_WEIGHT_CO2E: Record<PlasticKey, number> = {
  coke: 0.5,
  c2: 0.335,
  ns: 0.5,
};

const PLASTIC_NAMES: Record<PlasticKey, string> = {
  coke: 'Coca-Cola',
  c2: 'C2',
  ns: `Nature' Spring`,
};

type PlasticKey = 'c2' | 'ns' | 'coke';

export default function Scan() {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const [nyckelAccessToken, setNyckelAccessToken] = useState<string>('');

  // The total CO2e of all scanned plastic wastes is mainly for display purposes.
  const [totalCo2e, setTotalCo2e] = useState<number>(0);

  // We'll use this array of scanned plastic wastes to calculate the total CO2e.
  const [scannedPlasticWastes, setScannedPlasticWastes] = useState<
    Array<UserWaste>
  >([]);

  const { userId } = useUser();
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  // We'll use this state to display the scanned plastic waste information. Again, this is mainly
  // for display purposes.
  const [scannedWasteData, setScannedWasteData] = useState<UserWaste>({
    label: '',
    image: '',
    co2e: 0,
  });

  const [confidenceError, setConfidenceError] = useState<{
    hasError: boolean;
    confidence: number;
  }>({ hasError: false, confidence: 0 });

  const user = useMemo(
    () =>
      new UserConstructor(
        localforage.createInstance({
          name: APP_NAME,
          storeName: DB_STORE,
        })
      ),
    []
  );

  useEffect(() => {
    connect().then((res) => {
      setNyckelAccessToken(res.access_token);
    });
  }, []);

  /**
   * Saves the image source and updates the scanned plastic wastes and total CO2e.
   * @returns A promise that resolves to void.
   */
  const saveImageSrc = async (): Promise<boolean> => {
    setScannedPlasticWastes((wastes) => {
      const updatedWastes = [...wastes, scannedWasteData];
      const newTotalCo2e = calculateTotalCO2e(updatedWastes);
      setTotalCo2e(newTotalCo2e);
      return updatedWastes;
    });

    return true;
  };

  console.log(userId);

  /**
   * Saves the user's data by updating the waste information.
   *
   * @returns A Promise that resolves to void.
   */
  const saveUserData = async (): Promise<void> => {
    if (!userId) {
      console.error('Invalid user ID: ', userId);
      return;
    }

    const currUsrDat = await user.readUserData(userId);
    if (!currUsrDat) {
      console.error('User does not exist: ', userId);
      return;
    }

    try {
      await user.updateUserData(userId, {
        ...currUsrDat,
        waste: [...currUsrDat.waste, ...scannedPlasticWastes],
      });
      toast({
        title: 'Scanned objects saved.',
        description:
          "The scanned objects' data has been added to your trash list.",
        status: 'success',
        isClosable: true,
      });
      window.location.reload();
    } catch (err) {
      console.error('Error updating user data: ', err);
    }
  };

  const memoizedInvoke = useCallback(
    async (imgSrc: string, accessToken: string) => {
      return await invoke(imgSrc, accessToken);
    },
    []
  );

  /**
   * Handles setting the image source, invoking the image classification model,
   * and updating the scanned waste data.
   * @param imgSrc - The source of the image to be scanned.
   * @returns A promise that resolves when the handling is complete.
   */
  const handleSetImgSrc = async (imgSrc: string | null): Promise<boolean> => {
    setImgSrc(imgSrc);

    // We only do an early return for a falsy `imgSrc` when invoking the image classification model.
    if (!imgSrc) {
      console.error('Invalid image source: ', imgSrc);
      setScannedWasteData({
        label: '',
        image: '',
        co2e: 0,
      });
      return false;
    }

    const label = await memoizedInvoke(imgSrc, nyckelAccessToken);
    const scannedPlasticWasteCo2e =
      PLASTIC_WEIGHT_CO2E[label.labelName as PlasticKey];

    if (label.confidence < MIN_ACCEPTABLE_CONFIDENCE) {
      console.warn('Confidence level too low: ', label);
      setConfidenceError({
        hasError: true,
        confidence: label.confidence,
      });

      // We don't need to return false for now. Let the user verify the label and decide whether to
      // save the data or not.
      // return false;
    }

    const userWaste: UserWaste = {
      label: label.labelName,
      image: imgSrc,
      // * NOTE: Ensure that the label name is a key in PLASTIC_WEIGHT_CO2E, otherwise this will
      // * throw an error. Check your Nyckel/image classification model labels.
      co2e: scannedPlasticWasteCo2e,
    };

    setScannedWasteData(userWaste);

    return true;
  };

  return (
    <Box my={4}>
      {confidenceError.hasError && imgSrc && (
        <Container my={4}>
          <Alert status="warning" flexDirection="column" gap={4}>
            <AlertIcon boxSize={6} />
            <AlertTitle>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
                Confidence level too low
              </Text>
            </AlertTitle>
            <AlertDescription>
              <Text
                fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                textAlign="center"
              >
                The confidence level of the image classification model is too
                low:&nbsp;
                <Highlight
                  query={`${
                    parseFloat(confidenceError.confidence.toFixed(2)) * 100
                  }%`}
                  styles={{ rounded: 'full', px: '1', py: '1', bg: 'orange' }}
                >
                  {`${
                    parseFloat(confidenceError.confidence.toFixed(2)) * 100
                  }%`}
                </Highlight>
                . This means that the model is not very certain about the
                classification result. Using a low confidence result can lead to
                inaccurate data and unreliable calculations. Please try again
                with a clearer image or a different item.
              </Text>
            </AlertDescription>
          </Alert>
        </Container>
      )}
      {isSmallScreen ? (
        <Container>
          {showScanner(imgSrc, handleSetImgSrc, saveImageSrc)}
          <Divider my={4} />
          {showScannedObjectInfo(scannedWasteData, scannedWasteData.co2e)}
          <Divider my={4} />
          {showCo2eSummary(scannedPlasticWastes, totalCo2e, saveUserData)}
        </Container>
      ) : (
        <HStack alignItems="flex-start">
          {showScanner(imgSrc, handleSetImgSrc, saveImageSrc)}
          <Container>
            {showScannedObjectInfo(scannedWasteData, scannedWasteData.co2e)}
            <Divider my={4} />
            {showCo2eSummary(scannedPlasticWastes, totalCo2e, saveUserData)}
          </Container>
        </HStack>
      )}
    </Box>
  );
}

function showScanner(
  imgSrc: string | null,
  setImgSrc: (imgSrc: string | null) => Promise<boolean>,
  saveImageSrc: () => Promise<boolean>
): JSX.Element {
  return (
    <Scanner
      imgSrc={imgSrc}
      setImgSrc={setImgSrc}
      saveImageSrc={saveImageSrc}
      scale={1.3}
      previewElement={
        <Box
          borderColor="red"
          borderWidth={4}
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={imgSrc ?? ''} alt="Scanned plastic waste" />
        </Box>
      }
    />
  );
}

function showScannedObjectInfo(
  scannedWasteData: UserWaste,
  scannedPlasticWasteCo2e: number
): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Scanned Plastic Waste</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Stat>
            <StatLabel fontSize="sm">Label</StatLabel>
            <StatNumber>
              {PLASTIC_NAMES[scannedWasteData.label as PlasticKey]}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="sm">Carbon footprint</StatLabel>
            <StatNumber> {scannedPlasticWasteCo2e} kg CO2e</StatNumber>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  );
}

function showCo2eSummary(
  scannedPlasticWastes: Array<UserWaste>,
  totalCo2e: number,
  saveUserData: () => Promise<void>
): JSX.Element {
  const totalCo2eByPlasticKey: Record<PlasticKey, number> =
    scannedPlasticWastes.reduce((totals, waste) => {
      const plasticKey = waste.label as PlasticKey;
      totals[plasticKey] = (totals[plasticKey] || 0) + waste.co2e;
      return totals;
    }, {} as Record<PlasticKey, number>);

  const countByPlasticKey: Record<PlasticKey, number> =
    scannedPlasticWastes.reduce((counts, waste) => {
      const plasticKey = waste.label as PlasticKey;
      counts[plasticKey] = (counts[plasticKey] || 0) + 1; // Increment the count for this plasticKey
      return counts;
    }, {} as Record<PlasticKey, number>);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Summary</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing="4">
          <Stat>
            <Accordion allowToggle>
              <AccordionItem>
                <StatLabel mt={2} fontSize="sm">
                  Total Carbon Footprint
                </StatLabel>
                <AccordionButton px={0}>
                  <Box as="span" flex="1" textAlign="left">
                    <StatNumber>{totalCo2e} kg CO2e</StatNumber>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={2}>
                  {Object.entries(totalCo2eByPlasticKey).map(
                    ([plasticKey, totalCo2e]) => (
                      <Box key={plasticKey}>
                        <Divider mb={2} />
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <StatHelpText fontSize="sm">
                            {PLASTIC_NAMES[plasticKey as PlasticKey]}
                          </StatHelpText>
                          <StatHelpText>{totalCo2e} kg CO2e</StatHelpText>
                        </Box>
                      </Box>
                    )
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stat>
          <Stat>
            <Accordion allowToggle>
              <AccordionItem>
                <StatLabel mt={2} fontSize="sm">
                  Total Scanned Plastic Waste
                </StatLabel>
                <AccordionButton px={0}>
                  <Box as="span" flex="1" textAlign="left">
                    <StatNumber>
                      {scannedPlasticWastes.length} plastic waste
                    </StatNumber>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={2}>
                  {Object.entries(countByPlasticKey).map(
                    ([plasticKey, count]) => (
                      <Stat key={plasticKey}>
                        <StatHelpText>
                          {count} {PLASTIC_NAMES[plasticKey as PlasticKey]}
                        </StatHelpText>
                      </Stat>
                    )
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stat>

          <Box alignSelf="flex-end">
            <Button
              aria-label="Save"
              variant="solid"
              colorScheme="teal"
              onClick={async () => {
                await saveUserData();
              }}
              leftIcon={<FaSave />}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
