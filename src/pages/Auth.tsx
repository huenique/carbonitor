import localforage from 'localforage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { SESSION_COOKIE_NAME } from '../config';
import { UserConstructor, UserData } from '../db';
import { useUser } from '../hooks/useUser';

interface AuthProps {
  appName: string;
  dbStoreName: string;
}

export default function Auth(props: AuthProps) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const user = new UserConstructor(
    localforage.createInstance({
      name: props.appName,
      storeName: props.dbStoreName,
    })
  );

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [email, setEmail] = useState('');

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    onClose();
    console.info('Checking if user exists:', email);

    try {
      const userData = await user.readUserData(email);
      if (userData) {
        console.info('User exists:', userData);

        await processExistingUser(userData);
      } else {
        await createNewUser();
      }

      createCookieSession();
    } catch (err) {
      console.error('Error during login process. Details: ', err);
    }
  };

  const processExistingUser = async (userData: UserData) => {
    setUser(userData.id);
    navigate('/');
  };

  const createNewUser = async () => {
    const newUserData: UserData = {
      id: email,
      waste: [
        {
          label: '',
          image: '',
          co2e: 0,
        },
      ],
    };

    console.info('Creating new user data:', newUserData);

    try {
      await user.createUserData(email, newUserData);
      setUser(newUserData.id);
      console.info('Successfully created user data.');
      navigate('/');
    } catch (err) {
      console.error("Failed to create user's data. Details: ", err);
    }
  };

  const createCookieSession = () => {
    document.cookie = `${SESSION_COOKIE_NAME}=${email}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleLogin}>
      <ModalOverlay />
      <ModalContent alignSelf="center" mx={4}>
        <ModalHeader>Please enter your email to continue</ModalHeader>
        <ModalBody>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={handleSetEmail}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
