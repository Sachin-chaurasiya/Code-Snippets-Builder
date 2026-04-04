import {
  IconButton,
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
        pr="3rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter your password"
        {...props}
      />
      <InputRightElement>
        <IconButton
          aria-label={show ? 'Hide password' : 'Show password'}
          variant="ghost"
          size="sm"
          color="gray.400"
          _hover={{ color: 'gray.600' }}
          icon={show ? <BiHide /> : <BiShow />}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
