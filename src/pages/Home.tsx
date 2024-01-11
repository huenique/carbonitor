import { JSXElementConstructor, ReactElement } from 'react';
import { FaCamera, FaEllipsisH, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Box,
  Button,
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

export default function Home() {
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
            0.0
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            CO2e
          </Text>
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mb={8}
        w="full"
        display={{ base: 'none', md: 'grid' }}
      >
        <HDesktopButton
          onClick={() => {
            console.log('scan');
          }}
          alt="scan logo"
          text="Scan"
          icon={<FaCamera />}
          path="/scan"
        />
        <HDesktopButton
          onClick={() => {
            console.log('trash');
          }}
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
            variant="outline"
            colorScheme="teal"
            size="lg"
            w="full"
            shadow="lg"
          >
            More
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
          onClick={() => {
            console.log('scan');
          }}
          alt="scan logo"
          text="Scan"
          icon={<FaCamera />}
          path="/scan"
        />
        <HMobileButton
          onClick={() => {
            console.log('trash');
          }}
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
            variant="outline"
            colorScheme="teal"
            size="lg"
            w="full"
          >
            More
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
        <MenuItem icon={<FaInfoCircle />}>Common Plastic Items</MenuItem>
      </Link>
      <Link as={ReactRouterLink} to="/variables">
        <MenuItem icon={<GrResources />}>What is my carbon footprint?</MenuItem>
      </Link>
    </MenuList>
  );
}

interface HButtonProps {
  onClick: () => void;
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
        onClick={props.onClick}
        variant="outline"
        colorScheme="teal"
        size="lg"
        w="full"
        leftIcon={props.icon}
        px="24px"
        shadow="lg"
        borderColor="gray.500"
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
        onClick={props.onClick}
        variant="outline"
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
