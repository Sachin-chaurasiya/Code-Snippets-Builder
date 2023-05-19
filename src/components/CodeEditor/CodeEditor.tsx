import React, { useMemo, useState } from 'react';
import './code-editor.css';
import Editor from 'react-simple-code-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CODE_SNIPPET } from 'constant';
import { useAppProvider } from 'AppProvider';
import { HiPlus } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { last } from 'lodash';
import {
  getIconByFileExtension,
  getIconColorByFileExtension,
} from 'utils/IconUtils';

const CodeEditor = () => {
  const [code, setCode] = useState<string>(CODE_SNIPPET);
  const {
    editor: { theme, fontSize, language },
  } = useAppProvider();

  const [showFileName, setShowFileName] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  const selectedStyle = useMemo(
    () => prismStyles[theme as keyof typeof prismStyles],
    [theme]
  );

  const backgroundColor = useMemo(
    () => selectedStyle['pre[class*="language-"]'].background,
    [selectedStyle]
  );

  const FileNameIcon = useMemo(
    () => getIconByFileExtension(last(fileName.split('.')) ?? ''),
    [fileName]
  );

  const fileNameIconColor = useMemo(
    () => getIconColorByFileExtension(last(fileName.split('.')) ?? ''),
    [fileName]
  );

  return (
    <>
      <Box className="window">
        <Box
          className="title-bar"
          as={Flex}
          style={{ background: `${backgroundColor}e6` }}
        >
          <Flex alignItems="center" gap={2}>
            <Box className="title-buttons">
              <Box className="title-button"></Box>
              <Box className="title-button"></Box>
              <Box className="title-button"></Box>
            </Box>
            {showFileName ? (
              <Flex>
                <InputGroup>
                  <Input
                    placeholder="untitled"
                    color="white"
                    _hover={{ outline: 'none', border: 'none' }}
                    _focusVisible={{ outline: 'none', border: 'none' }}
                    outline="none"
                    border="none"
                    spellCheck={false}
                    style={{
                      background: backgroundColor,
                      marginTop: '12px',
                      width: 'auto',
                      maxWidth: '200px',
                      textOverflow: 'ellipsis',
                    }}
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                  {FileNameIcon ? (
                    <InputLeftElement>
                      <IconButton
                        alignItems="end"
                        _hover={{ background: 'none' }}
                        aria-label="remove-button"
                        variant="ghost"
                        icon={
                          <FileNameIcon
                            fontSize={16}
                            color={fileNameIconColor}
                          />
                        }
                      />
                    </InputLeftElement>
                  ) : null}
                  <InputRightElement>
                    <IconButton
                      alignItems="end"
                      _hover={{ background: 'none' }}
                      _groupHover={{ display: 'flex' }}
                      aria-label="remove-button"
                      variant="ghost"
                      display="none"
                      icon={
                        <IoMdClose
                          fontWeight="bold"
                          color="white"
                          fontSize={18}
                        />
                      }
                      onClick={() => setShowFileName(false)}
                    />
                  </InputRightElement>
                </InputGroup>
              </Flex>
            ) : (
              <IconButton
                _hover={{ background: 'none' }}
                aria-label="add-button"
                variant="ghost"
                icon={<HiPlus fontWeight="bold" color="white" fontSize={18} />}
                onClick={() => setShowFileName(true)}
              />
            )}
          </Flex>
        </Box>
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
          padding={10}
          style={{
            fontSize,
          }}
        />
      </Box>
    </>
  );
};

export default CodeEditor;
