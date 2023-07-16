import {
  AspectRatio,
  Button,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { map, startCase } from 'lodash';
import React from 'react';
import { DEV_IMAGES } from 'constants/image';
import { RiImageAddLine } from 'react-icons/ri';
import { BORDER_RADIUS_MEDIUM } from 'constants/common';

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
      <Button width="100px" height="100px" onClick={onOpen}>
        <RiImageAddLine fontSize="50px" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Media</ModalHeader>
          <ModalCloseButton />
          <ModalBody my={4}>
            <Grid
              overflowY="scroll"
              templateColumns="repeat(4, 1fr)"
              gap={4}
              minHeight="30vh"
              maxHeight="70vh">
              {map(DEV_IMAGES, (source, key) => (
                <AspectRatio key={key} ratio={1}>
                  <Tooltip
                    label={startCase(key)}
                    borderRadius={BORDER_RADIUS_MEDIUM}>
                    <Button
                      variant="outline"
                      aspectRatio="auto"
                      aria-label={key}
                      minWidth={10}
                      onClick={() => {
                        handleSourceSelection(source);
                      }}>
                      <Image src={source} />
                    </Button>
                  </Tooltip>
                </AspectRatio>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMediaModal;
