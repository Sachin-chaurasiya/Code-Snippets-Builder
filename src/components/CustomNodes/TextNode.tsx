import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

const TextNode: FC<NodeProps> = ({ selected }) => {
  return (
    <>
      <NodeResizer keepAspectRatio isVisible={selected} />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />

      <Editable
        autoFocus
        bg="transparent"
        placeholder="Type something..."
        height="inherit"
        width="inherit"
        px="8px"
      >
        <EditablePreview />
        <EditableTextarea
          autoFocus
          _focusVisible={{ outline: 'none' }}
          resize="none"
        />
      </Editable>

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
