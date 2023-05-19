import React, { useMemo, useState } from 'react';
import './code-editor.css';
import Editor from 'react-simple-code-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAppProvider } from 'AppProvider';
import { Box, Flex } from '@chakra-ui/react';
import TitleBar from './TitleBar';

const CodeEditor = () => {
  const [code, setCode] = useState<string>('// put your code here');
  const {
    editor: { theme, fontSize, language },
  } = useAppProvider();

  const selectedStyle = useMemo(
    () => prismStyles[theme as keyof typeof prismStyles],
    [theme]
  );

  const backgroundColor = useMemo(
    () => selectedStyle['pre[class*="language-"]'].background,
    [selectedStyle]
  );

  return (
    <>
      <Box className="window" style={{ background: `${backgroundColor}` }}>
        <TitleBar backgroundColor={backgroundColor} />
        <Flex paddingY="21px">
          <Box />
          <Editor
            id="code-editor"
            textareaId="code-editor-textarea"
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => (
              <SyntaxHighlighter language={language} style={selectedStyle}>
                {code}
              </SyntaxHighlighter>
            )}
            style={{
              fontSize,
            }}
          />
        </Flex>
      </Box>
    </>
  );
};

export default CodeEditor;
