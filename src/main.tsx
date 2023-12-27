import localforage from 'localforage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Box, ChakraProvider, Container } from '@chakra-ui/react';

import Navbar from './components/Navbar.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import { APP_NAME, DB_STORE } from './config';
import { UserProvider } from './contexts/UserContext.tsx';
import Auth from './pages/Auth.tsx';
import Home from './pages/Home.tsx';
import Scan from './pages/Scan.tsx';

localforage.config({
  name: APP_NAME,
  storeName: DB_STORE,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/scan',
    element: (
      <RequireAuth>
        <Scan />
      </RequireAuth>
    ),
  },
  {
    path: '/auth',
    element: <Auth appName={APP_NAME} dbStoreName={DB_STORE} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <Navbar />
        <Box h="100vh">
          <Container maxW="container.lg" h="100%">
            <RouterProvider router={router} />
          </Container>
        </Box>
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
