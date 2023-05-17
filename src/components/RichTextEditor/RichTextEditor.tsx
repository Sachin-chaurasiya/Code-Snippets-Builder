import React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { useState, useRef, useEffect } from 'react';
import 'prosemirror-view/style/prosemirror.css';
import { isNil } from 'lodash';
import { Box } from '@chakra-ui/react';
import './rich-text-editor.css';

const RichTextEditor = () => {
  const [editorState] = useState(EditorState.create({ schema }));
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = document.getElementById('rich-text-editor');

    if (editorRef.current && isNil(editor)) {
      new EditorView(editorRef.current, {
        state: editorState,
        attributes: { id: 'rich-text-editor' },
      });
    }
  }, [editorRef, editorState]);

  return (
    <Box
      minWidth={20}
      minHeight={20}
      bg="white"
      borderRadius="4px"
      ref={editorRef}
    />
  );
};

export default RichTextEditor;
