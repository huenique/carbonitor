import localforage from 'localforage';
import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import Scanner from '../components/Scanner';

interface User {
  email: string;
}

export default function Scan() {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    localforage.getItem('user').then((userData) => {
      if (userData) {
        setUser(userData as User);
      } else {
        console.error('User data not found');
      }
    });
  }, []);

  const handleSetImgSrc = (imgSrc: string | null) => {
    if (imgSrc && user) {
      localforage.setItem(user.email, {
        imgSrc: imgSrc,
      });

      setImgSrc(imgSrc);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <Container my={4}>
      <Scanner scale={1.3} imgSrc={imgSrc} setImgSrc={handleSetImgSrc} />
    </Container>
  );
}
