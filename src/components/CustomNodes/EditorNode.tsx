import React, { FC, memo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { Handle, NodeProps, Position } from 'reactflow';
import { Box } from '@chakra-ui/react';

const EditorNode: FC<NodeProps> = ({ selected }) => {
  return (
    <Box
      border={selected ? '1px' : ''}
      borderColor={selected ? 'blue.400' : ''}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
      <CodeEditor />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
    </Box>
  );
};

export default memo(EditorNode);
