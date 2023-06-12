import React, { FC, memo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { NodeProps } from 'reactflow';
import { Box } from '@chakra-ui/react';
import { HANDLE_COLOR } from 'constants/editor';
import { NodeData, NodeDataStore } from 'interfaces/Editor.interface';
import { INITIAL_CONTEXT_DATA } from 'constants/common';

const EditorNode: FC<NodeProps<NodeData>> = ({ selected, data, id }) => {
  const {
    onUpdate,
    code = '',
    fontSize = INITIAL_CONTEXT_DATA.editor.fontSize,
    language = INITIAL_CONTEXT_DATA.editor.language,
    theme = INITIAL_CONTEXT_DATA.editor.theme,
    snippetName = '',
  } = data;

  const handleUpdate = (data: NodeDataStore) => {
    if (onUpdate) {
      onUpdate(id, data);
    }
  };

  return (
    <Box
      border={selected ? '1px' : ''}
      borderColor={selected ? HANDLE_COLOR : ''}>
      <CodeEditor
        snippetName={snippetName}
        onUpdate={handleUpdate}
        snippetCode={code}
        editorTheme={theme}
        language={language}
        fontSize={fontSize}
      />
    </Box>
  );
};

export default memo(EditorNode);
