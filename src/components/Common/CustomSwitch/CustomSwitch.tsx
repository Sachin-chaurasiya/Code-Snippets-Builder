import { Switch, SwitchProps } from '@chakra-ui/react';
import { PRIMARY_GRADIENT_COLOR } from 'constants/common';
import React, { FC } from 'react';

const CustomSwitch: FC<SwitchProps> = (props) => {
  return (
    <Switch
      sx={{
        'span.chakra-switch__track:is([data-checked])': {
          bgGradient: PRIMARY_GRADIENT_COLOR,
        },
      }}
      {...props}
    />
  );
};

export default CustomSwitch;
