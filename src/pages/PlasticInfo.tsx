import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as InfoLink, plasticItems } from '../db/plasticItems';
import { FaExternalLinkAlt } from 'react-icons/fa';

const PlasticInfo = () => {
  const { category } = useParams<{ category?: string }>();
  const items = category ? plasticItems[category] : {};

  return (
    <Box my={4} p={5}>
      <Heading size="md" mb={6}>
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Plastics`
          : 'Category Undefined'}
      </Heading>
      <VStack spacing={8} align="stretch">
        {Object.entries(items).map(([itemName, itemInfo]) => (
          <Box
            key={itemName}
            p={5}
            shadow="lg"
            borderColor="gray.500"
            border="1px"
            rounded="xl"
          >
            <Heading size="md" mb={4} color="teal.600">
              {itemName.replace(/_/g, ' ').toUpperCase()}
            </Heading>
            <Text mb={4} fontSize="md">
              <b>What:</b> {itemInfo.what.desc}
            </Text>
            {renderLinks(itemInfo.what.links)}
            <Text mb={4}>
              <b>Environmental Effect:</b>{' '}
              {typeof itemInfo.effect === 'string'
                ? itemInfo.effect
                : itemInfo.effect.desc}
            </Text>
            {typeof itemInfo.effect !== 'string' &&
              renderLinks(itemInfo.effect.links)}
            <Text mb={4}>
              <b>Reduce My Waste:</b> {itemInfo.reduce.do}
            </Text>
            <Text mb={4}>
              <b>Alternative(s):</b> {itemInfo.reduce.alternative}
            </Text>
            <Text mb={4}>
              <b>What you can do:</b> {itemInfo.reduce.cta}
            </Text>
            {renderLinks(itemInfo.reduce.links)}
            <Divider my={5} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

const renderLinks = (links: InfoLink[]) => (
  <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={4} mb={3}>
    {links.map((link, index) => (
      <Link
        href={link.link}
        isExternal
        color="teal.500"
        _hover={{ color: 'teal.600' }}
        key={index}
      >
        <Flex
          align="center"
          justify="space-between"
          p={3}
          borderWidth="1px"
          borderRadius="lg"
          shadow="sm"
        >
          {link.title}
          <FaExternalLinkAlt />
        </Flex>
      </Link>
    ))}
  </SimpleGrid>
);

export default PlasticInfo;