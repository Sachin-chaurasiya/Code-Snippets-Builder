import {
  Button,
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
import React from 'react';
import { DEV_IMAGES } from 'constant';

const AddMediaModal = ({
  onSourceSelect,
}: {
  onSourceSelect: (source: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSourceSelection = (source: string) => {
    onSourceSelect(source);
    onClose();
  };

  return (
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
  );
};

export default AddMediaModal;
