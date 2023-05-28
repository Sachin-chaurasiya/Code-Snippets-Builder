import { Switch, SwitchProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const CustomSwitch: FC<SwitchProps> = (props) => {
  return (
    <Switch
      sx={{
        'span.chakra-switch__track:is([data-checked])': {
          background:
            'linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))',
        },
      }}
      {...props}
    />
  );
};

export default CustomSwitch;
