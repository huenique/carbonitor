import localforage from 'localforage';
import {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FaCamera, FaEllipsisH, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import { UserData, UserWaste } from '../db';

type ChartDataType = ChartData<'line', number[], string>;

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();
  const [totalCO2e, setTotalCO2e] = useState(0.0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        label: 'Daily CO2e (kg)',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const fetchCO2e = useCallback(async (email: string) => {
    try {
      const userData = await localforage.getItem<UserData>(email);
      if (userData) {
        setUserData(userData);
        prepareChartData(userData);
        const totalCO2e = userData.waste.reduce(
          (sum, waste) => sum + waste.co2e,
          0.0
        );
        setTotalCO2e(totalCO2e);
      }
    } catch (error) {
      console.error('Error fetching CO2e:', error);
    }
  }, []);

  const prepareChartData = (data: UserData) => {
    const co2eByDate = data.waste.reduce(
      (acc: { [key: string]: number }, item: UserWaste) => {
        const date = new Date(item.dateScanned).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + item.co2e;
        return acc;
      },
      {}
    );

    const labels = Object.keys(co2eByDate).sort();
    const dataPoints = labels.map((label) => co2eByDate[label]);
    const maxCo2e = Math.max(...dataPoints);

    const pointStyles = dataPoints.map((value) => ({
      radius: value === maxCo2e ? 8 : 3,
      style: value === maxCo2e ? 'star' : 'circle',
      backgroundColor: value === maxCo2e ? 'darkred' : 'rgb(75, 192, 192)',
      borderColor: value === maxCo2e ? 'darkred' : 'rgba(75, 192, 192, 0.2)',
      borderWidth: value === maxCo2e ? 2 : 1,
    }));

    setChartData({
      labels,
      datasets: [
        {
          label: 'Daily CO2e (kg)',
          data: dataPoints,
          fill: false,
          backgroundColor: pointStyles.map((style) => style.backgroundColor),
          borderColor: pointStyles.map((style) => style.borderColor),
          borderWidth: pointStyles.map((style) => style.borderWidth),
          tension: 0.1,
          pointRadius: pointStyles.map((style) => style.radius),
          pointStyle: pointStyles.map((style) => style.style),
        },
      ],
    });
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        position: 'average' as const,
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} units`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const email = document.cookie.split('=')[1];
    fetchCO2e(email);
  }, [fetchCO2e]);

  return (
    <Box
      minH="screen"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      gap={4}
    >
      <Text fontSize="xl" mt={2} mb={8} alignSelf="flex-start">
        Let's tidy up!
      </Text>
      <Box
        minH="screen"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
        gap={4}
        w="full"
      >
        <Text onClick={onToggle} cursor="pointer" color="blue.500">
          {isOpen ? 'Hide Full Report' : 'View Full Report'}
        </Text>
        <Collapse
          in={isOpen}
          animateOpacity
          style={{
            width: '100%',
          }}
        >
          <Flex
            w="full"
            p={4}
            rounded="xl"
            flexDirection="column"
            border="1px"
            borderColor="gray.500"
            shadow="lg"
          >
            <Heading size="md" mb={2}>
              My carbon footprint
            </Heading>
            <Flex alignItems="end" justifyContent="space-between">
              <Text fontSize="xx-large" fontWeight="bold" color="green.500">
                {totalCO2e.toFixed(2)}
              </Text>
              <Flex>
                <Text fontSize="sm" fontWeight="bold">
                  kg CO2e
                </Text>
              </Flex>
            </Flex>
            <Divider my={2} />
            <Heading size="md" mb={2}>
              Scanned Today
            </Heading>
            <Flex alignItems="end" justifyContent="space-between">
              <Text fontSize="xx-large" fontWeight="bold" color="green.500">
                {userData?.waste
                  .reduce((sum, waste) => {
                    const today = new Date().setHours(0, 0, 0, 0);
                    const wasteDate = new Date(waste.dateScanned).setHours(
                      0,
                      0,
                      0,
                      0
                    );
                    return today === wasteDate ? sum + waste.co2e : sum;
                  }, 0)
                  .toFixed(2)}
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                kg CO2e
              </Text>
            </Flex>
            <Text fontSize="sm" mt={2}>
              Plastic Bottles Scanned Today:{' '}
              {
                userData?.waste.filter((waste) => {
                  const today = new Date().setHours(0, 0, 0, 0);
                  const wasteDate = new Date(waste.dateScanned).setHours(
                    0,
                    0,
                    0,
                    0
                  );
                  return today === wasteDate;
                }).length
              }
            </Text>
          </Flex>
        </Collapse>
      </Box>
      {/* Chart.js Graph */}
      <Box width="100%" height="400px">
        <Line data={chartData} options={options} />
      </Box>

      <Divider my={8} />

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mb={8}
        w="full"
        display={{ base: 'none', md: 'grid' }}
      >
        <HDesktopButton
          alt="scan logo"
          text="Scan"
          icon={<FaCamera />}
          path="/scan"
        />
        <HDesktopButton
          alt="trash logo"
          text="Trash"
          icon={<FaTrash />}
          path="/trash"
        />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<FaEllipsisH />}
            aria-label="More"
            onClick={() => {}}
            variant="solid"
            colorScheme="teal"
            size="lg"
            w="full"
            shadow="lg"
          >
            More About
          </MenuButton>
          <HMenuList />
        </Menu>
      </Grid>

      <Flex
        w="full"
        rounded="xl"
        flexDirection="column"
        gap={4}
        display={{ base: 'grid', md: 'none' }}
      >
        <HMobileButton
          alt="scan logo"
          text="Scan"
          icon={<FaCamera />}
          path="/scan"
        />
        <HMobileButton
          alt="scan logo"
          text="Trash"
          icon={<FaTrash />}
          path="/trash"
        />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<FaEllipsisH />}
            aria-label="More"
            colorScheme="teal"
            size="lg"
            w="full"
            h={24}
            fontSize="x-large"
            variant="solid"
          >
            More About
          </MenuButton>
          <HMenuList />
        </Menu>
      </Flex>
    </Box>
  );
}

function HMenuList(): JSX.Element {
  return (
    <MenuList>
      <Link as={ReactRouterLink} to="/info">
        <MenuItem icon={<FaInfoCircle />} fontSize="x-large">
          Common plastic items
        </MenuItem>
      </Link>
      <Link as={ReactRouterLink} to="/variables">
        <MenuItem icon={<GrResources />} fontSize="x-large">
          Carbon footprint
        </MenuItem>
      </Link>
    </MenuList>
  );
}

interface HButtonProps {
  alt: string;
  text: string;
  icon?:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined;
  path: string;
}

function HMobileButton(props: HButtonProps): JSX.Element {
  return (
    <Link as={ReactRouterLink} to={props.path}>
      <Button
        aria-label={props.text}
        variant="solid"
        colorScheme="teal"
        size="lg"
        w="full"
        leftIcon={props.icon}
        px="24px"
        shadow="lg"
        borderColor="gray.500"
        fontSize="xx-large"
        sx={{ height: 24 }}
      >
        <Text w="100%">{props.text}</Text>
      </Button>
    </Link>
  );
}

function HDesktopButton(props: HButtonProps): JSX.Element {
  return (
    <Link as={ReactRouterLink} to={props.path}>
      <Button
        aria-label={props.text}
        variant="solid"
        colorScheme="teal"
        size="lg"
        w="full"
        gap={4}
        justifyContent="start"
        leftIcon={props.icon}
        shadow="lg"
        borderColor="gray.500"
      >
        <Text w="100%">{props.text}</Text>
      </Button>
    </Link>
  );
}
