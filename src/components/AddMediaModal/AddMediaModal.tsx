import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { map } from 'lodash';
import React, { useState } from 'react';
import { DEV_IMAGES } from '../../constants';
import { FiEdit } from 'react-icons/fi';

const AddMediaModal = () => {
  const [selectedSource, setSelectedSource] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSourceSelection = (source: string) => {
    setSelectedSource(source);
    onClose();
  };

  return (
    <>
      {selectedSource ? (
        <Box position="relative" as={ButtonGroup} bg="white" borderRadius={4}>
          <IconButton
            position="absolute"
            top={0}
            right={1}
            _hover={{ bg: 'none' }}
            _groupHover={{ opacity: 1 }}
            aria-label="update-media"
            icon={<FiEdit />}
            variant="ghost"
            opacity={0}
            onClick={() => {
              onOpen();
              setSelectedSource('');
            }}
          />
          <Image
            boxSize="150px"
            objectFit="cover"
            src={selectedSource}
            style={{ marginInlineStart: 0, WebkitMarginStart: 0 }}
          />
        </Box>
      ) : (
        <>
          <Button onClick={onOpen}>Add Media</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Media</ModalHeader>
              <ModalCloseButton />
              <ModalBody my={4}>
                <Grid
                  templateColumns="repeat(4, 1fr)"
                  gap={4}
                  minHeight="30vh"
                  maxHeight="70vh"
                >
                  {map(DEV_IMAGES, (source, key) => (
                    <IconButton
                      key={key}
                      variant="outline"
                      aspectRatio="auto"
                      aria-label={key}
                      minWidth={10}
                      onClick={() => handleSourceSelection(source)}
                    >
                      <Image src={source} />
                    </IconButton>
                  ))}
                </Grid>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddMediaModal;
