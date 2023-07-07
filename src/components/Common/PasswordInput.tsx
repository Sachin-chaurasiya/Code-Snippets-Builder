import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

const PasswordInput: FC<InputProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <InputGroup>
      <Input
        name="password"
        pr="4rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter your password"
        {...props}
      />
      <InputRightElement width="4rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? <BiHide /> : <BiShow />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
