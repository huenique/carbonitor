import localforage from 'localforage';
import { useEffect, useState } from 'react';

import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';

import { UserData, UserWaste } from '../db';
import { getCookieSession } from '../utils/cookie';

type AggregatedWaste = {
  label: string;
  totalCo2e: number;
  count: number;
};

export default function Trash() {
  const [aggregatedWaste, setAggregatedWaste] = useState<AggregatedWaste[]>([]);
  const [userEmail, setUserEmail] = useState('');

  const aggregateWaste = (wasteArray: UserWaste[]) => {
    const wasteMap = new Map<string, AggregatedWaste>();

    wasteArray.forEach((waste) => {
      const existing = wasteMap.get(waste.label);
      if (existing) {
        existing.totalCo2e += waste.co2e;
        existing.count += 1;
      } else {
        wasteMap.set(waste.label, {
          label: waste.label,
          totalCo2e: waste.co2e,
          count: 1,
        });
      }
    });

    setAggregatedWaste(Array.from(wasteMap.values()));
  };

  // Increment handler adds a new item to the waste array
  const handleIncrement = async (label: string) => {
    const userData: UserData | null = await localforage.getItem(userEmail);
    if (userData) {
      const newItem = userData.waste.find((waste) => waste.label === label);
      const updatedWaste = newItem
        ? [...userData.waste, newItem]
        : userData.waste;
      await localforage.setItem(userEmail, {
        ...userData,
        waste: updatedWaste,
      });
      aggregateWaste(updatedWaste);
    }
  };

  // Decrement handler removes an item from the waste array
  const handleDecrement = async (label: string) => {
    const userData: UserData | null = await localforage.getItem(userEmail);
    if (userData) {
      let removed = false;
      const updatedWaste = userData.waste.filter((waste) => {
        if (!removed && waste.label === label) {
          removed = true;
          return false;
        }
        return true;
      });
      await localforage.setItem(userEmail, {
        ...userData,
        waste: updatedWaste,
      });
      aggregateWaste(updatedWaste);
    }
  };

  // Delete handler removes all items with the specified label
  const handleDelete = async (label: string) => {
    const userData: UserData | null = await localforage.getItem(userEmail);
    if (userData) {
      // Filter out all wastes with the matching label
      const updatedWaste = userData.waste.filter(
        (waste) => waste.label !== label
      );

      // Update the user data in localforage
      await localforage.setItem(userEmail, {
        ...userData,
        waste: updatedWaste,
      });

      // Update the aggregated waste state
      setAggregatedWaste((prev) =>
        prev.filter((aggregatedWaste) => aggregatedWaste.label !== label)
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const email = getCookieSession() ?? '';
      const userData: UserData | null = await localforage.getItem(email);
      if (userData && userData.waste) {
        aggregateWaste(userData.waste);
        setUserEmail(email);
      }
    };

    fetchData();
  }, []);

  return (
    <Box my={4}>
      <VStack>
        {aggregatedWaste.map((waste, index) => (
          <Card key={index} w="100%">
            <CardHeader>
              <Flex>
                <VStack align="flex-start" w="100%">
                  <Flex
                    align="baseline"
                    flexDirection={{ base: 'column', md: 'row' }}
                    gap={2}
                  >
                    <Text
                      fontSize={{ base: '2xl', md: '4xl' }}
                      fontWeight="semibold"
                    >
                      {waste.label.toUpperCase()}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      textTransform="uppercase"
                    >
                      Plastic Bottle
                    </Text>
                  </Flex>
                </VStack>
                <Box display="flex" justifyContent="flex-end" width="100%">
                  <IconButton
                    aria-label="Delete waste"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(waste.label)}
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                  />
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex justify="space-between" align="center">
                <Text
                  fontSize={{
                    base: 'lg',
                    md: '2xl',
                  }}
                  fontWeight="semibold"
                  color="orange.500"
                  mt={2}
                >
                  CO2e: {waste.totalCo2e.toFixed(2)}
                </Text>
                <HStack justifyContent="flex-end" my={4}>
                  <IconButton
                    aria-label="Decrease count"
                    color="orange.500"
                    icon={<MinusIcon />}
                    onClick={() => handleDecrement(waste.label)}
                    size={{ base: 'sm', md: 'md' }}
                    variant="outline"
                    isRound
                  />
                  <Text
                    fontSize={{ base: 'lg', md: '2xl' }}
                    fontWeight="semibold"
                    px={4}
                  >
                    {waste.count}
                  </Text>
                  <IconButton
                    aria-label="Increase count"
                    color="orange.500"
                    icon={<AddIcon />}
                    onClick={() => handleIncrement(waste.label)}
                    size={{ base: 'sm', md: 'md' }}
                    variant="outline"
                    isRound
                  />
                </HStack>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}
