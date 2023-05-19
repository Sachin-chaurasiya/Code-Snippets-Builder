import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { last } from 'lodash';
import React, { useMemo, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import {
  getIconByFileExtension,
  getIconColorByFileExtension,
} from 'utils/IconUtils';

const TitleBar = ({
  backgroundColor,
}: {
  backgroundColor: string | number | undefined;
}) => {
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
      direction="row"
      gap="16px"
      paddingInline="16px"
      position="relative"
      height="45px"
      alignItems="center"
      style={{ background: 'rgba(255, 255, 255, 0.06)' }}
    >
      <Icon
        display="inline-block"
        width="55px"
        height="auto"
        focusable="false"
        viewBox="0 0 420 100"
        lineHeight="1em"
        verticalAlign="middle"
        color="currentcolor"
        flexShrink={0}
      >
        <circle fill="#ff5f57" cx="50" cy="50" r="50"></circle>
        <circle fill="#febc2e" cx="210" cy="50" r="50"></circle>
        <circle fill="#28c840" cx="370" cy="50" r="50"></circle>
      </Icon>
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
          style={{ background: backgroundColor }}
        >
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
              onChange={(e) => setFileName(e.target.value)}
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
            onClick={() => setShowFileName(false)}
          />
        </Box>
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
  );
};

export default TitleBar;
