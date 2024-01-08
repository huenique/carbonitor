import { useState, useEffect } from 'react';
import localforage from 'localforage';
import {
  Card,
  CardBody,
  VStack,
  Text,
  CardHeader,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react';

// Assuming the type UserWaste is imported from '../db'
import { UserWaste } from '../db';

type UserWasteWithId = UserWaste & { id: string; };
type UserData = {
  id: string;
  waste: UserWasteWithId[];
};

export default function Trash() {
  const [userWaste, setUserWaste] = useState<UserWasteWithId[]>([]);
  const [selectedWaste, setSelectedWaste] = useState<UserWasteWithId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const userEmail = 'test@gg.com'; // Replace with dynamic email if needed

  useEffect(() => {
    const fetchData = async () => {
      const userData: UserData | null = await localforage.getItem(userEmail);
      if (userData && userData.waste) {
        setUserWaste(userData.waste.map((w, index) => ({ ...w, id: `waste-${index}` })));
      }
    };
    fetchData();
  }, []);

  const updateLocalForageData = async (updatedWaste: UserWasteWithId[]) => {
    await localforage.setItem(userEmail, { id: userEmail, waste: updatedWaste });
  };

  const handleDelete = async (id: string) => {
    const updatedWaste = userWaste.filter((waste) => waste.id !== id);
    setUserWaste(updatedWaste);
    await updateLocalForageData(updatedWaste);
  };

  const handleEdit = (waste: UserWasteWithId) => {
    setSelectedWaste(waste);
    setNewLabel(waste.label);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (selectedWaste) {
      const updatedWaste = userWaste.map((waste) => {
        if (waste.id === selectedWaste.id) {
          return { ...waste, label: newLabel };
        }
        return waste;
      });
      setUserWaste(updatedWaste);
      await updateLocalForageData(updatedWaste);
      setIsModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <VStack>
        {userWaste.map((waste) => (
          <Card key={waste.id}>
            <CardHeader>
              <Heading>{waste.label}</Heading>
            </CardHeader>
            <CardBody>
              <Text>CO2e: {waste.co2e}</Text>
              <Button onClick={() => handleDelete(waste.id)}>Delete</Button>
              <Button onClick={() => handleEdit(waste)}>Edit</Button>
            </CardBody>
          </Card>
        ))}
      </VStack>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Waste Item</ModalHeader>
          <ModalBody>
            <Input
              placeholder="New Label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
