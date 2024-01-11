import localforage from 'localforage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider, Container } from '@chakra-ui/react';

import Navbar from './components/Navbar.tsx';
import PlasticInfo from './pages/PlasticInfo.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import { APP_NAME, DB_STORE } from './config';
import { UserProvider } from './contexts/UserContext.tsx';
import Auth from './pages/Auth.tsx';
import Home from './pages/Home.tsx';
import Info from './pages/Info';
import NotFound from './pages/NotFound.tsx';
import Scan from './pages/Scan.tsx';
import Trash from './pages/Trash.tsx';
import Variables from './pages/Variables.tsx';

localforage.config({
  name: APP_NAME,
  storeName: DB_STORE,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <Box h="100vh">
          <BrowserRouter>
            <RequireAuth>
              <Navbar />
              <Container maxW="container.lg" h="100%">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/scan" element={<Scan />} />
                  <Route path="/trash" element={<Trash />} />
                  <Route path="/info" element={<Info />} />
                  <Route path="/info/:category" element={<PlasticInfo />} />
                  <Route
                    path="/auth"
                    element={<Auth appName={APP_NAME} dbStoreName={DB_STORE} />}
                  />
                  <Route path="/variables" element={<Variables />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Container>
            </RequireAuth>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
