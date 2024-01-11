import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Center minHeight="100vh" flexDirection="column" px={4}>
      <Box textAlign="center" py={10} px={6}>
        {/* <Image
          src="https://via.placeholder.com/150" 
          alt="Not Found"
          mx="auto"
          height="150px"
        /> */}
        <Heading as="h2" size="xl" mt={6} mb={2}>
          404: Page Not Found
        </Heading>
        <Text color="gray.600" mb={4}>
          Oops! The page you're looking for doesn't exist.
        </Text>

        <Button colorScheme="teal" as={Link} to="/">
          Go Home
        </Button>
      </Box>
    </Center>
  );
}
