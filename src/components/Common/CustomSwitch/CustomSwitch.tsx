import { Switch, SwitchProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const CustomSwitch: FC<SwitchProps> = (props) => {
  return (
    <Switch
      sx={{
        'span.chakra-switch__track:is([data-checked])': {
          bg: 'brand.500',
        },
      }}
      {...props}
    />
  );
};

export default CustomSwitch;
