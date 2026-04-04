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

  const defaultFontSize = logoSize === 'x-small' ? 'md' : 'xl';

  return (
    <Flex
      h={logoSize === 'x-small' ? '12' : '20'}
      alignItems="center"
      gap={1}
      {...rest}>
      <Image
        boxSize={boxSize}
        src={logoType === 'dark' ? LogoImage : LightLogoImage}
        objectFit="contain"
      />
      <Text
        ml={logoSize === 'x-small' ? '-4px' : '-12px'}
        mb="2px"
        fontSize={textFontSize ?? defaultFontSize}
        fontWeight={textFontWeight ?? 'bold'}
        color={textColor ?? 'brand.500'}>
        <span>Snippet</span>
        <span>Builder</span>
      </Text>
    </Flex>
  );
};

export default BrandLogo;
