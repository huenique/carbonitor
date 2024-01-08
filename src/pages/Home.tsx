import { JSXElementConstructor, ReactElement } from 'react';
import { FaCamera, FaEllipsisH, FaTrash } from 'react-icons/fa';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, Button, Flex, Grid, Link, Text } from '@chakra-ui/react';

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
      >
        <Text fontSize="large" fontWeight="bold" mb={2}>
          My carbon footprint
        </Text>
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
        <HDesktopButton
          onClick={() => {
            console.log('more');
          }}
          alt="scan logo"
          text="More"
          icon={<FaEllipsisH />}
          path="/more"
        />
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
        <HMobileButton
          onClick={() => {
            console.log('more');
          }}
          alt="scan logo"
          text="More"
          icon={<FaEllipsisH />}
          path="/more"
        />
      </Flex>
    </Box>
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

function HMobileButton(props: HButtonProps) {
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
      >
        {props.text}
      </Button>
    </Link>
  );
}

function HDesktopButton(props: HButtonProps) {
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
      >
        {props.text}
      </Button>
    </Link>
  );
}
