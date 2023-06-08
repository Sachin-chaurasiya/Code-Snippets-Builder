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
import { last } from 'lodash';
import React, { useMemo, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import {
  getIconByFileExtension,
  getIconColorByFileExtension,
} from 'utils/IconUtils';

const TitleBar = () => {
  const [showFileName, setShowFileName] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

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
          <Editable placeholder="Untitled">
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
                setFileName(e.target.value);
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
          }}
        />
      )}
    </Flex>
  );
};

export default TitleBar;
