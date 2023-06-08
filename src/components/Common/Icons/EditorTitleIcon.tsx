import { Icon } from '@chakra-ui/react';
import React from 'react';

const EditorTitleIcon = () => {
  return (
    <Icon
      display="inline-block"
      width="55px"
      height="auto"
      focusable="false"
      viewBox="0 0 420 100"
      lineHeight="1em"
      verticalAlign="middle"
      color="currentcolor"
      flexShrink={0}>
      <circle fill="#ff5f57" cx="50" cy="50" r="50"></circle>
      <circle fill="#febc2e" cx="210" cy="50" r="50"></circle>
      <circle fill="#28c840" cx="370" cy="50" r="50"></circle>
    </Icon>
  );
};

export default EditorTitleIcon;
