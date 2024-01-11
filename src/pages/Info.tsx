import { Box, Heading, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaBath,
  FaUtensils,
  FaHome,
  FaSchool,
  FaEllipsisH,
} from 'react-icons/fa';

type IconType = React.ElementType<{ w: number; h: number }>;

const categoryIcons: { [key: string]: IconType } = {
  bathroom: FaBath,
  kitchen: FaUtensils,
  home: FaHome,
  school: FaSchool,
  others: FaEllipsisH,
};

const CATEGORIES = ['bathroom', 'kitchen', 'home', 'school', 'other'];

const PlasticCategories = () => {
  return (
    <Box my={4} p={5}>
      <Heading size="md" mb={2}>
        Plastic Waste Categories
      </Heading>
      <Text mb={4} color="gray.600">
        Explore the different categories of plastic waste to understand how they
        impact our environment and what we can do to reduce our footprint.
      </Text>
      <Box p={5} shadow="sm" borderWidth="1px" borderRadius="lg">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} py={5}>
          {CATEGORIES.map((category) => (
            <Box
              as={RouterLink}
              to={`/info/${category}`}
              key={category}
              p={3}
              borderWidth="1px"
              borderRadius="lg"
              border="1px"
              borderColor="gray.500"
              shadow="lg"
              _hover={{
                textDecoration: 'underline',
                textDecorationColor: 'teal',
              }}
              display="flex"
              alignItems="center"
              gap={4}
            >
              <Icon as={categoryIcons[category]} color="teal" />
              <Text fontSize="lg" fontWeight="medium" color="teal">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default PlasticCategories;
