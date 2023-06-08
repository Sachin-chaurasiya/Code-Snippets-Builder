import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';

import { RxDragHandleDots2 } from 'react-icons/rx';
import ExportButton from 'components/Editor/ExportButton/ExportButton';
import { toLower } from 'lodash';
import { BORDER_RADIUS_MEDIUM } from 'constants/common';
import { TOOL_BAR_ITEMS } from 'constants/editor';

const ToolBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/SnippetBuilder', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box
      as={Flex}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      mb={4}
      p={4}
      bg="white"
      borderRadius="md"
      shadow="md">
      <ButtonGroup>
        {TOOL_BAR_ITEMS.map(({ label, icon, nodeType }) => (
          <Tooltip
            key={label}
            label={`Add ${label}`}
            borderRadius={BORDER_RADIUS_MEDIUM}>
            <Button
              shadow="md"
              aria-label={`drag and drop ${toLower(label)}`}
              _hover={{
                background: 'white',
              }}
              background="white"
              p={4}
              draggable
              cursor="grab"
              rightIcon={<RxDragHandleDots2 />}
              leftIcon={<Icon as={icon} fontSize="20px" />}
              onDragStart={(event) => {
                onDragStart(event, nodeType);
              }}
            />
          </Tooltip>
        ))}
      </ButtonGroup>
      <ExportButton />
    </Box>
  );
};

export default ToolBar;
