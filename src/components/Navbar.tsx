import localforage from 'localforage';
import { FaUser } from 'react-icons/fa';
import { Link as ReactRouterLink } from 'react-router-dom';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';

import { APP_NAME, DB_STORE, SESSION_COOKIE_NAME } from '../config';
import { UserConstructor } from '../db';
import { useUser } from '../hooks/useUser';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { userId, setUser } = useUser();

  const resetCookieSession = () => {
    document.cookie = `${SESSION_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const getUserInstance = () => {
    const user = new UserConstructor(
      localforage.createInstance({
        name: APP_NAME,
        storeName: DB_STORE,
      })
    );

    return user;
  };

  const handleResetAccount = async () => {
    const user = getUserInstance();
    await user.deleteUserData(String(userId));
    resetCookieSession();
    window.location.reload();
  };

  const handleLogout = async () => {
    setUser(null);
    resetCookieSession();
  };

  return (
    <Box bg="teal.500" px={4}>
      <Container maxW="container.lg">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={onToggle}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" color="white">
              Carbonitor
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link as={ReactRouterLink} to="/" color="white">
                Home
              </Link>
              <Link as={ReactRouterLink} to="#" color="white">
                About
              </Link>
              <Link as={ReactRouterLink} to="#" color="white">
                Contact
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton>
                <FaUser size={24} color="white" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleResetAccount}>Reset Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link as={ReactRouterLink} to="/" color="white">
                Home
              </Link>
              <Link as={ReactRouterLink} to="#" color="white">
                About
              </Link>
              <Link as={ReactRouterLink} to="#" color="white">
                Contact
              </Link>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}
