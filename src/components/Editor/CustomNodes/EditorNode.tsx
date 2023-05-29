import React, { FC, memo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { NodeProps } from 'reactflow';
import { Box } from '@chakra-ui/react';
import { HANDLE_COLOR } from 'constants/editor';

const EditorNode: FC<NodeProps> = ({ selected }) => {
  return (
    <Box
      border={selected ? '1px' : ''}
      borderColor={selected ? HANDLE_COLOR : ''}
    >
      <CodeEditor />
    </Box>
  );
};

export default memo(EditorNode);
