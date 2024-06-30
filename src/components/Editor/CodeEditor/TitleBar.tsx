import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import EditorTitleIcon from 'components/Common/Icons/EditorTitleIcon';
import { CODE_EDITOR_BACKGROUND_COLOR } from 'constants/editor';
import { NodeDataStore } from 'interfaces/Editor.interface';
import { isEqual, last } from 'lodash';
import React, { useMemo, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import {
  getIconByFileExtension,
  getIconColorByFileExtension,
} from 'utils/IconUtils';

const TitleBar = ({
  snippetName,
  onUpdate,
  isSnippetNameVisible,
}: {
  snippetName: string;
  isSnippetNameVisible: boolean;
  onUpdate: (data: NodeDataStore) => void;
}) => {
  const [showFileName, setShowFileName] =
    useState<boolean>(isSnippetNameVisible);
  const [fileName, setFileName] = useState<string>(snippetName);

  const FileNameIcon = useMemo(
    () => getIconByFileExtension(last(fileName.split('.')) ?? ''),
    [fileName]
  );

  const fileNameIconColor = useMemo(
    () => getIconColorByFileExtension(last(fileName.split('.')) ?? ''),
    [fileName]
  );

  return (
    <Flex
      className="node-drag-handle"
      direction="row"
      gap="16px"
      paddingInline="16px"
      position="relative"
      height="45px"
      alignItems="center"
      borderRadius="10px"
      borderBottomLeftRadius="0px"
      borderBottomRightRadius="0px"
      style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
      <EditorTitleIcon />
      {showFileName ? (
        <Box
          alignItems="center"
          position="relative"
          color="gray.300"
          as={Flex}
          role="group"
          borderTopLeftRadius="6px"
          borderTopRightRadius="6px"
          borderBottom="none"
          marginTop="5px"
          paddingLeft="8px"
          height="40px"
          cursor="default"
          zIndex={1}
          style={{ background: CODE_EDITOR_BACKGROUND_COLOR }}>
          {FileNameIcon ? (
            <IconButton
              alignItems="center"
              _hover={{ background: 'none' }}
              aria-label="remove-button"
              variant="ghost"
              icon={<FileNameIcon fontSize={16} color={fileNameIconColor} />}
            />
          ) : null}
          <Editable placeholder="Untitled" value={fileName}>
            <EditablePreview />
            <EditableInput
              _hover={{ outline: 'none', border: 'none' }}
              _focusVisible={{ outline: 'none', border: 'none' }}
              cursor="text"
              outline="transparent solid 2px"
              outlineOffset="2px"
              color="whiteAlpha.800"
              minHeight="19px"
              minWidth="55px"
              userSelect="text"
              onChange={(e) => {
                const { value } = e.target;
                setFileName(value);
                onUpdate({ snippetName: value });
              }}
              onBlur={() => {
                if (!isEqual(snippetName, fileName)) {
                  onUpdate({ snippetName: fileName });
                }
              }}
            />
          </Editable>
          <IconButton
            alignItems="center"
            _hover={{ background: 'none' }}
            _groupHover={{ opacity: 1 }}
            aria-label="remove-button"
            variant="ghost"
            opacity={0}
            icon={<IoMdClose fontWeight="bold" color="white" fontSize={18} />}
            onClick={() => {
              setShowFileName(false);
              onUpdate({ snippetName: '', isSnippetNameVisible: false });
            }}
          />
        </Box>
      ) : (
        <IconButton
          _hover={{ background: 'none' }}
          aria-label="add-button"
          variant="ghost"
          icon={<HiPlus fontWeight="bold" color="white" fontSize={18} />}
          onClick={() => {
            setShowFileName(true);
            onUpdate({ isSnippetNameVisible: true });
          }}
        />
      )}
    </Flex>
  );
};

export default TitleBar;
