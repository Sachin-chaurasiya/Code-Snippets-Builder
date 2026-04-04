import React, { useEffect, useState } from 'react';
import { ReactFlowState, useReactFlow, useStore, useStoreApi } from 'reactflow';
import { shallow } from 'zustand/shallow';
import FitViewIcon from 'components/Common/Icons/FitViewIcon';
import UnlockIcon from 'components/Common/Icons/UnlockIcon';
import LockIcon from 'components/Common/Icons/LockIcon';
import {
  Box,
  Button,
  Flex,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import PlusIcon from '../../Common/Icons/PlusIcon';
import MinusIcon from '../../Common/Icons/MinusIcon';

import { FiCheck } from 'react-icons/fi';

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

const EditorControls = ({ isUpdating }: { isUpdating: boolean }) => {
  const store = useStoreApi();

  const state = store.getState();

  const { isInteractive, minZoomReached, maxZoomReached } = useStore(
    selector,
    shallow
  );
  const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow();

  const [currentZoom, setCurrentZoom] = useState<number>(() => {
    const transform = state.transform;
    return transform[2];
  });

  const onZoomInHandler = () => {
    zoomIn();
  };

  const onZoomOutHandler = () => {
    zoomOut();
  };

  const onFitViewHandler = () => {
    fitView();
  };

  const handleZoomTo = (value: number) => {
    zoomTo(value);
  };

  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  };

  const handleSubscription = (updatedState: ReactFlowState) => {
    setCurrentZoom(updatedState.transform[2]);
  };

  useEffect(() => {
    store.subscribe(handleSubscription);
  }, []);

  return (
    <Flex mb={4} justifyContent="space-between" align="center">
      <HStack spacing={2}>
        <Tooltip label="Fit view" borderRadius="lg" fontSize="xs">
          <Button
            variant="ghost"
            size="sm"
            borderRadius="lg"
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            onClick={onFitViewHandler}
            aria-label="fit view">
            <FitViewIcon />
          </Button>
        </Tooltip>

        <Tooltip label="Toggle interactivity" borderRadius="lg" fontSize="xs">
          <Button
            variant="ghost"
            size="sm"
            borderRadius="lg"
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            onClick={onToggleInteractivity}
            aria-label="toggle interactivity">
            {isInteractive ? <UnlockIcon /> : <LockIcon />}
          </Button>
        </Tooltip>
      </HStack>

      <HStack spacing={4}>
        <HStack spacing={2}>
          {isUpdating ? (
            <>
              <Spinner size="xs" color="gray.400" />
              <Text fontSize="xs" color="gray.400">
                Saving
              </Text>
            </>
          ) : (
            <>
              <Box color="green.500">
                <FiCheck size={14} />
              </Box>
              <Text fontSize="xs" color="gray.500">
                Saved
              </Text>
            </>
          )}
        </HStack>
        <Flex
          bg="white"
          align="center"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.100"
          px={1}>
          <Tooltip label="Zoom out" borderRadius="lg" fontSize="xs">
            <Button
              variant="ghost"
              size="xs"
              onClick={onZoomOutHandler}
              aria-label="zoom out"
              disabled={minZoomReached}>
              <MinusIcon />
            </Button>
          </Tooltip>
          <Box w="120px" px={2}>
            <Slider
              step={0.1}
              value={currentZoom}
              min={state.minZoom}
              max={state.maxZoom}
              onChange={handleZoomTo}>
              <SliderTrack h="4px" borderRadius="full">
                <SliderFilledTrack bg="brand.500" />
              </SliderTrack>
              <SliderThumb boxSize={3} />
            </Slider>
          </Box>
          <Tooltip label="Zoom in" borderRadius="lg" fontSize="xs">
            <Button
              variant="ghost"
              size="xs"
              onClick={onZoomInHandler}
              aria-label="zoom in"
              disabled={maxZoomReached}>
              <PlusIcon />
            </Button>
          </Tooltip>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default EditorControls;
