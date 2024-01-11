import { FaUser } from 'react-icons/fa';

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
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

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
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
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
