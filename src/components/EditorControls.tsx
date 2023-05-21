import React from 'react';
import { ReactFlowState, useReactFlow, useStore, useStoreApi } from 'reactflow';
import { shallow } from 'zustand/shallow';
import FitViewIcon from 'components/Icons/FitViewIcon';
import UnlockIcon from 'components/Icons/UnlockIcon';
import LockIcon from 'components/Icons/LockIcon';
import { Box, Button, Flex, Tooltip } from '@chakra-ui/react';
import PlusIcon from './Icons/PlusIcon';
import MinusIcon from './Icons/MinusIcon';

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

const EditorControls = () => {
  const store = useStoreApi();
  const { isInteractive, minZoomReached, maxZoomReached } = useStore(
    selector,
    shallow
  );
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onZoomInHandler = () => {
    zoomIn();
  };

  const onZoomOutHandler = () => {
    zoomOut();
  };

  const onFitViewHandler = () => {
    fitView();
  };

  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  };

  return (
    <Box as={Flex} mb={4} justifyContent="space-between">
      <Flex gap={2}>
        <Tooltip label="Fit view">
          <Button bg="white" onClick={onFitViewHandler} aria-label="fit view">
            <FitViewIcon />
          </Button>
        </Tooltip>

        <Tooltip label="Toggle interactivity">
          <Button
            bg="white"
            onClick={onToggleInteractivity}
            aria-label="toggle interactivity"
          >
            {isInteractive ? <UnlockIcon /> : <LockIcon />}
          </Button>
        </Tooltip>
      </Flex>
      <Flex gap={2}>
        <Tooltip label="Zoom in">
          <Button
            bg="white"
            onClick={onZoomInHandler}
            aria-label="zoom in"
            disabled={maxZoomReached}
          >
            <PlusIcon />
          </Button>
        </Tooltip>

        <Tooltip label="Zoom out">
          <Button
            bg="white"
            onClick={onZoomOutHandler}
            aria-label="zoom out"
            disabled={minZoomReached}
          >
            <MinusIcon />
          </Button>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default EditorControls;
