import React, { FC, memo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { Handle, NodeProps, Position } from 'reactflow';
import { Box } from '@chakra-ui/react';
import { HANDLE_COLOR } from 'constants/editor';

const EditorNode: FC<NodeProps> = ({ selected }) => {
  return (
    <Box
      border={selected ? '1px' : ''}
      borderColor={selected ? HANDLE_COLOR : ''}
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
