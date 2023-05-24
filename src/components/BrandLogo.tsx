import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import React, { FC, useMemo } from 'react';
import LogoImage from 'assets/images/logo.png';

type LogoSize = 'small' | 'medium' | 'large';

interface BrandLogoProps extends FlexProps {
  logoSize?: LogoSize;
}

const BrandLogo: FC<BrandLogoProps> = ({ logoSize = 'medium', ...rest }) => {
  const boxSize = useMemo(() => {
    switch (logoSize) {
      case 'small':
        return '64px';

      case 'large':
        return '128px';

      case 'medium':
      default:
        return '72px';
    }
  }, [logoSize]);

  return (
    <Flex h="20" alignItems="center" gap={2} {...rest}>
      <Image boxSize={boxSize} src={LogoImage} objectFit="contain" />
      <Text
        ml="-16px"
        mb="4px"
        fontSize="xl"
        fontWeight="bold"
        background="linear-gradient(270deg, rgb(20, 30, 48), rgb(36, 59, 85))"
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
