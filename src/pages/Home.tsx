import localforage from 'localforage';
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { FaCamera, FaEllipsisH, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { UserData } from '../db';

export default function Home() {
  const [totalCO2e, setTotalCO2e] = useState(0.0);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchCO2e = async (email: string) => {
    try {
      const userData: UserData | null = await localforage.getItem(email);
      if (userData) {
        setUserData(userData);

        const totalCO2e = userData.waste.reduce(
          (sum, waste) => sum + waste.co2e,
          0.0
        );

        setTotalCO2e(totalCO2e);
      }
    } catch (error) {
      console.error('Error fetching CO2e:', error);
    }
  };

  useEffect(() => {
    const email = document.cookie.split('=')[1];

    fetchCO2e(email);
  }, []);

  return (
    <Box
      minH="screen"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      gap={4}
    >
      <Text fontSize="xl" mt={2} mb={8} alignSelf="flex-start">
        Let's tidy up!
      </Text>

      <Flex
        w="full"
        p={4}
        rounded="xl"
        flexDirection="column"
        border="1px"
        borderColor="gray.500"
        shadow="lg"
      >
        <Heading size="md" mb={2}>
          My carbon footprint
        </Heading>
        <Flex alignItems="end" justifyContent="space-between">
          <Text fontSize="xx-large" fontWeight="bold" color="green.500">
            {totalCO2e.toFixed(2)}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            kg CO2e
          </Text>
        </Flex>

        <Divider my={2} />

        <Heading size="md" mb={2}>
          Scanned Today
        </Heading>
        <Flex alignItems="end" justifyContent="space-between">
          <Text fontSize="xx-large" fontWeight="bold" color="green.500">
            {userData?.waste
              .reduce((sum, waste) => {
                const today = new Date().setHours(0, 0, 0, 0);
                const wasteDate = new Date(waste.dateScanned).setHours(
                  0,
                  0,
                  0,
                  0
                );
                if (today === wasteDate) {
                  return sum + waste.co2e;
                }
                return sum;
              }, 0)
              .toFixed(2)}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            kg CO2e
          </Text>
        </Flex>

        <Text fontSize="sm" mt={2}>
          Plastic Bottles Scanned Today:{' '}
          {
            userData?.waste.filter((waste) => {
              const today = new Date().setHours(0, 0, 0, 0);
              const wasteDate = new Date(waste.dateScanned).setHours(
                0,
                0,
                0,
                0
              );
              return today === wasteDate;
            }).length
          }
        </Text>
      </Flex>

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mb={8}
        w="full"
        display={{ base: 'none', md: 'grid' }}
      >
        <HDesktopButton
          alt="scan logo"
          text="Scan"
          icon={<FaCamera />}
          path="/scan"
        />
        <HDesktopButton
          alt="scan logo"
          text="Trash"
          icon={<FaTrash />}
          path="/trash"
        />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<FaEllipsisH />}
            aria-label="More"
            onClick={() => {}}
            variant="solid"
            colorScheme="teal"
            size="lg"
            w="full"
            shadow="lg"
          >
            More About
          </MenuButton>
          <HMenuList />
        </Menu>
      </Grid>

      <Flex
        w="full"
        rounded="xl"
        flexDirection="column"
        gap={4}
        display={{ base: 'grid', md: 'none' }}
      >
        <HMobileButton
          alt="scan logo"
          text="Scan"
          icon={<FaCamera />}
          path="/scan"
        />
        <HMobileButton
          alt="scan logo"
          text="Trash"
          icon={<FaTrash />}
          path="/trash"
        />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<FaEllipsisH />}
            aria-label="More"
            colorScheme="teal"
            size="lg"
            w="full"
            h={24}
            fontSize="x-large"
            variant="solid"
          >
            More About
          </MenuButton>
          <HMenuList />
        </Menu>
      </Flex>
    </Box>
  );
}

function HMenuList(): JSX.Element {
  return (
    <MenuList>
      <Link as={ReactRouterLink} to="/info">
        <MenuItem icon={<FaInfoCircle />} fontSize="x-large">
          Common plastic items
        </MenuItem>
      </Link>
      <Link as={ReactRouterLink} to="/variables">
        <MenuItem icon={<GrResources />} fontSize="x-large">
          Carbon footprint
        </MenuItem>
      </Link>
    </MenuList>
  );
}

interface HButtonProps {
  alt: string;
  text: string;
  icon?:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined;
  path: string;
}

function HMobileButton(props: HButtonProps): JSX.Element {
  return (
    <Link as={ReactRouterLink} to={props.path}>
      <Button
        aria-label={props.text}
        variant="solid"
        colorScheme="teal"
        size="lg"
        w="full"
        leftIcon={props.icon}
        px="24px"
        shadow="lg"
        borderColor="gray.500"
        fontSize="xx-large"
        sx={{
          height: 24,
        }}
      >
        <Text w="100%">{props.text}</Text>
      </Button>
    </Link>
  );
}

function HDesktopButton(props: HButtonProps): JSX.Element {
  return (
    <Link as={ReactRouterLink} to={props.path}>
      <Button
        aria-label={props.text}
        variant="solid"
        colorScheme="teal"
        size="lg"
        w="full"
        gap={4}
        justifyContent="start"
        leftIcon={props.icon}
        shadow="lg"
        borderColor="gray.500"
      >
        <Text w="100%">{props.text}</Text>
      </Button>
    </Link>
  );
}
