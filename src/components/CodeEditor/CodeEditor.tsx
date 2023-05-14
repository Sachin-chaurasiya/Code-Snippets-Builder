import React, { useMemo, useState } from 'react';
import './code-editor.css';
import Editor from 'react-simple-code-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Grid, GridItem, Select } from '@chakra-ui/react';
import languages from 'react-syntax-highlighter/dist/esm/languages/prism/supported-languages';
import { map, startCase, toNumber } from 'lodash';
import { CODE_SNIPPET, FONT_SIZES } from '../../constants';

const CodeEditor = () => {
  const [code, setCode] = useState<string>(CODE_SNIPPET);

  const [currentStyle, setCurrentStyle] = useState<string>('dracula');
  const [currentLanguage, setCurrentLanguage] = useState<string>('javascript');
  const [currentFontSize, setCurrentFontSize] = useState<number>(14);

  const selectedStyle = useMemo(
    () => prismStyles[currentStyle as keyof typeof prismStyles],
    [currentStyle]
  );

  const backgroundColor = useMemo(
    () => selectedStyle['pre[class*="language-"]'].background,
    [selectedStyle]
  );

  return (
    <>
      <Grid mb={4} templateColumns="repeat(3, 1fr)" gap={8}>
        <GridItem>
          <Select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
          >
            {languages.map((language: string) => (
              <option key={language} value={language}>
                {startCase(language)}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            value={currentStyle}
            onChange={(e) => setCurrentStyle(e.target.value)}
          >
            {map(prismStyles, (_, name) => (
              <option key={name} value={name}>
                {startCase(name)}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            value={currentFontSize}
            onChange={(e) => setCurrentFontSize(toNumber(e.target.value))}
          >
            {map(FONT_SIZES, (size) => (
              <option key={size} value={size}>
                {`${size}px`}
              </option>
            ))}
          </Select>
        </GridItem>
      </Grid>
      <div className="window">
        <div
          className="title-bar"
          style={{ background: `${backgroundColor}e6` }}
        >
          <div className="title-buttons">
            <div className="title-button"></div>
            <div className="title-button"></div>
            <div className="title-button"></div>
          </div>
        </div>
        <Editor
          id="code-editor"
          textareaId="code-editor-textarea"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => (
            <SyntaxHighlighter language={currentLanguage} style={selectedStyle}>
              {code}
            </SyntaxHighlighter>
          )}
          padding={10}
          style={{
            fontSize: currentFontSize,
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
