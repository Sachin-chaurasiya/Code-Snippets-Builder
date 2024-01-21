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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import PlusIcon from '../../Common/Icons/PlusIcon';
import MinusIcon from '../../Common/Icons/MinusIcon';
import { BORDER_RADIUS_LARGE, BORDER_RADIUS_MEDIUM } from 'constants/common';

import { FcCheckmark } from 'react-icons/fc';

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
    <Box as={Flex} mb={4} justifyContent="space-between">
      <Flex gap={2} flex={1}>
        <Tooltip label="Fit view" borderRadius={BORDER_RADIUS_MEDIUM}>
          <Button
            shadow="md"
            _hover={{ background: 'white' }}
            bg="white"
            onClick={onFitViewHandler}
            aria-label="fit view">
            <FitViewIcon />
          </Button>
        </Tooltip>

        <Tooltip
          label="Toggle interactivity"
          borderRadius={BORDER_RADIUS_MEDIUM}>
          <Button
            shadow="md"
            _hover={{ background: 'white' }}
            bg="white"
            onClick={onToggleInteractivity}
            aria-label="toggle interactivity">
            {isInteractive ? <UnlockIcon /> : <LockIcon />}
          </Button>
        </Tooltip>
      </Flex>
      <Stack w="full" flex={0.5} direction="row" spacing={4}>
        <Stack direction="row" spacing={2} align="center">
          {isUpdating ? (
            <>
              <Spinner size="sm" />
              <Text>Saving</Text>
            </>
          ) : (
            <>
              <FcCheckmark />
              <Text>Saved</Text>
            </>
          )}
        </Stack>
        <Flex
          flex={1}
          bg="white"
          justifyContent="space-between"
          borderRadius={BORDER_RADIUS_LARGE}
          shadow="md">
          <Tooltip label="Zoom out" borderRadius={BORDER_RADIUS_MEDIUM}>
            <Button
              _hover={{ background: 'transparent' }}
              onClick={onZoomOutHandler}
              aria-label="zoom out"
              disabled={minZoomReached}
              variant="ghost">
              <MinusIcon />
            </Button>
          </Tooltip>
          <Slider
            step={0.1}
            value={currentZoom}
            min={state.minZoom}
            max={state.maxZoom}
            onChange={handleZoomTo}>
            <SliderTrack>
              <SliderFilledTrack bg="brand.500" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Tooltip label="Zoom in" borderRadius={BORDER_RADIUS_MEDIUM}>
            <Button
              _hover={{ background: 'transparent' }}
              onClick={onZoomInHandler}
              aria-label="zoom in"
              disabled={maxZoomReached}
              variant="ghost">
              <PlusIcon />
            </Button>
          </Tooltip>
        </Flex>
      </Stack>
    </Box>
  );
};

export default EditorControls;
