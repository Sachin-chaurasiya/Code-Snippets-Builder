import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

import CustomSwitch from 'components/Common/CustomSwitch/CustomSwitch';
import { GRADIENT_COLORS } from 'constants/editor';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { EditorSidebarProps } from 'interfaces/Editor.interface';
import React, { FC } from 'react';
import { BiCheckCircle } from 'react-icons/bi';

const BackgroundConfig: FC<
  Pick<
    EditorSidebarProps,
    'background' | 'onUpdateBackground' | 'hideWaterMark' | 'onUpdateWaterMark'
  >
> = ({ background, onUpdateBackground, hideWaterMark, onUpdateWaterMark }) => {
  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold" {...COMMON_TEXT_PROPS}>
        Background
      </Text>
      <Divider />
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="water-mark" mb="0">
          Hide watermark
        </FormLabel>
        <CustomSwitch
          id="water-mark"
          isChecked={hideWaterMark}
          onChange={(e) => {
            onUpdateWaterMark(e.target.checked);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Fill</FormLabel>
        <SimpleGrid columns={5} gap={4}>
          {GRADIENT_COLORS.map((c) => (
            <Button
              key={c}
              aria-label={c}
              background={c}
              height="40px"
              width="40px"
              padding={0}
              minWidth="unset"
              borderRadius={3}
              _hover={{ background: c }}
              onClick={() => {
                onUpdateBackground(c);
              }}>
              {background === c ? (
                <BiCheckCircle
                  color="white"
                  style={{ display: 'block', margin: 'auto' }}
                />
              ) : (
                <></>
              )}
            </Button>
          ))}
        </SimpleGrid>
      </FormControl>
    </Box>
  );
};

export default BackgroundConfig;
