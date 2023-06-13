import React, { FC, useEffect, useMemo, useState } from 'react';
import './code-editor.css';
import { Box } from '@chakra-ui/react';
import TitleBar from './TitleBar';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';
import { CODE_EDITOR_BACKGROUND_COLOR } from 'constants/editor';
import { NodeDataStore } from 'interfaces/Editor.interface';

interface CodeEditorProps {
  onUpdate: (data: NodeDataStore) => void;
  snippetCode: string;
  editorTheme: string;
  language: string;
  fontSize: number;
  snippetName: string;
  isSnippetNameVisible: boolean;
}

const CodeEditor: FC<CodeEditorProps> = ({
  onUpdate,
  snippetCode,
  editorTheme,
  language,
  fontSize,
  snippetName,
  isSnippetNameVisible,
}) => {
  const [code, setCode] = useState<string>(
    snippetCode || '// Put your code snippet here'
  );

  const theme = useMemo(
    () => themes[editorTheme as keyof typeof themes],
    [editorTheme]
  );

  const extensions = useMemo(
    () => [langs[language as keyof typeof langs]()],
    [language]
  );

  useEffect(() => {
    onUpdate({ code });
  }, [code]);

  useEffect(() => {
    const element = document.querySelector('[contenteditable="true"]');
    element?.setAttribute('data-gramm', 'false');
    element?.setAttribute('data-gramm_editor', 'false');
    element?.setAttribute('data-enable-grammarly', 'false');
  }, []);

  return (
    <>
      <Box
        className="window"
        style={{ background: `${CODE_EDITOR_BACKGROUND_COLOR}` }}>
        <TitleBar
          isSnippetNameVisible={isSnippetNameVisible}
          snippetName={snippetName}
          onUpdate={onUpdate}
        />

        <CodeMirror
          spellCheck={false}
          id="code-editor"
          style={{ fontSize: `${fontSize}px` }}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            autocompletion: false,
            highlightActiveLine: false,
            tabSize: 4,
          }}
          value={code}
          height="100%"
          theme={theme as ReactCodeMirrorProps['theme']}
          extensions={extensions}
          onChange={(code) => {
            setCode(code);
          }}
        />
      </Box>
    </>
  );
};

export default CodeEditor;
