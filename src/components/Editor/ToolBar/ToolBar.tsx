import { Box, Button, Flex, HStack, Icon, Tooltip } from '@chakra-ui/react';
import React from 'react';

import { RxDragHandleDots2 } from 'react-icons/rx';
import ExportButton from 'components/Editor/ExportButton/ExportButton';
import { toLower } from 'lodash';
import { TOOL_BAR_ITEMS } from 'constants/editor';

const ToolBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/SnippetBuilder', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="full"
      mb={4}
      px={4}
      py={3}
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.04)">
      <HStack spacing={2}>
        {TOOL_BAR_ITEMS.map(({ label, icon, nodeType }) => (
          <Tooltip
            key={label}
            label={`Add ${label}`}
            borderRadius="lg"
            fontSize="xs">
            <Button
              id={nodeType}
              aria-label={`drag and drop ${toLower(label)}`}
              variant="ghost"
              size="sm"
              borderRadius="lg"
              _hover={{
                bg: 'gray.50',
              }}
              draggable
              cursor="grab"
              rightIcon={<RxDragHandleDots2 color="#9CA3AF" />}
              leftIcon={<Icon as={icon} fontSize="16px" color="gray.600" />}
              onDragStart={(event) => {
                onDragStart(event, nodeType);
              }}
            />
          </Tooltip>
        ))}
      </HStack>
      <ExportButton />
    </Flex>
  );
};

export default ToolBar;
