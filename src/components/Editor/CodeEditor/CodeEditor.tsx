import React, { useEffect, useMemo, useState } from 'react';
import './code-editor.css';
import { useAppProvider } from 'AppProvider';
import { Box } from '@chakra-ui/react';
import TitleBar from './TitleBar';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';
import { CODE_EDITOR_BACKGROUND_COLOR } from 'constants/editor';

const CodeEditor = () => {
  const [code, setCode] = useState<string>('// Put your code snippet here');
  const { editor } = useAppProvider();

  const theme = useMemo(
    () => themes[editor.theme as keyof typeof themes],
    [editor.theme]
  );

  const extensions = useMemo(
    () => [langs[editor.language as keyof typeof langs]()],
    [editor.language]
  );

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
        style={{ background: `${CODE_EDITOR_BACKGROUND_COLOR}` }}
      >
        <TitleBar />

        <CodeMirror
          spellCheck={false}
          id="code-editor"
          style={{ fontSize: `${editor.fontSize}px` }}
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
          onChange={(code) => setCode(code)}
        />
      </Box>
    </>
  );
};

export default CodeEditor;
