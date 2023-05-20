import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import LogoImage from 'assets/images/logo.png';

const BrandLogo: FC<FlexProps> = (props) => {
  return (
    <Flex h="20" alignItems="center" gap={2} {...props}>
      <Image boxSize="64px" src={LogoImage} objectFit="contain" />
      <Text
        ml="-16px"
        mb="4px"
        fontSize="xl"
        fontWeight="bold"
        backgroundImage="linear-gradient(270deg, rgb(20, 30, 48), rgb(36, 59, 85))"
        color="transparent"
        backgroundClip="text"
      >
        <span>Snippet</span>
        <span>Builder</span>
      </Text>
    </Flex>
  );
};

export default BrandLogo;
