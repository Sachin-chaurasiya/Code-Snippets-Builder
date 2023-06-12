import React, { FC, memo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { NodeProps } from 'reactflow';
import { Box } from '@chakra-ui/react';
import { HANDLE_COLOR } from 'constants/editor';
import { NodeData, NodeDataStore } from 'interfaces/Editor.interface';

const EditorNode: FC<NodeProps<NodeData>> = ({ selected, data, id }) => {
  const { onUpdate, code = '' } = data;

  const handleUpdate = (data: NodeDataStore) => {
    if (onUpdate) {
      onUpdate(id, data);
    }
  };

  return (
    <Box
      border={selected ? '1px' : ''}
      borderColor={selected ? HANDLE_COLOR : ''}>
      <CodeEditor onUpdate={handleUpdate} snippetCode={code} />
    </Box>
  );
};

export default memo(EditorNode);
