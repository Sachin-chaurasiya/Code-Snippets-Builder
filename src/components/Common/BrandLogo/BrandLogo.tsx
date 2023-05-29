import { Flex, Image, Text } from '@chakra-ui/react';
import React, { FC, useMemo } from 'react';
import LogoImage from 'assets/images/logo.png';
import LightLogoImage from 'assets/images/light-logo.png';
import { BrandLogoProps } from './BrandLogo.interface';

const BrandLogo: FC<BrandLogoProps> = ({
  logoSize = 'medium',
  logoType = 'dark',
  textColor,
  textBackgroundColor,
  backgroundClip,
  textFontSize,
  textFontWeight,
  ...rest
}) => {
  const boxSize = useMemo(() => {
    switch (logoSize) {
      case 'small':
        return '64px';

      case 'x-small':
        return '40px';

      case 'large':
        return '128px';

      case 'medium':
      default:
        return '72px';
    }
  }, [logoSize]);

  return (
    <Flex h="20" alignItems="center" gap={2} {...rest}>
      <Image
        boxSize={boxSize}
        src={logoType === 'dark' ? LogoImage : LightLogoImage}
        objectFit="contain"
      />
      <Text
        ml="-16px"
        mb="4px"
        fontSize={textFontSize ?? 'xl'}
        fontWeight={textFontWeight ?? 'bold'}
        background={
          textBackgroundColor ??
          'linear-gradient(270deg, rgb(20, 30, 48), rgb(36, 59, 85))'
        }
        color={textColor ?? 'transparent'}
        backgroundClip={backgroundClip ?? 'text'}
      >
        <span>Snippet</span>
        <span>Builder</span>
      </Text>
    </Flex>
  );
};

export default BrandLogo;
