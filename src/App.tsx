import { Box, Container } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Box h="100vh">
      <Navbar />
      <Container maxW="container.lg">
        <Home />
      </Container>
    </Box>
  );
}

export default App;
