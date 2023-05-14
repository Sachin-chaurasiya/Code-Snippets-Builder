import { Textarea, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

const TextNode: FC<NodeProps> = ({ selected }) => {
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
      <Textarea
        _hover={{ outline: 'none', border: 'none' }}
        _focusVisible={{ outline: 'none', border: 'none' }}
        outline="none"
        border="none"
        autoFocus
        bg="white"
        shadow="md"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        padding={4}
        borderRadius={4}
        tabIndex={0}
        resize="none"
        rows={1}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
    </>
  );
};

export default TextNode;
