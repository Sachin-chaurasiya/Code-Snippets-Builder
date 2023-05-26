import { Flex, FlexProps, Image, Text, TextProps } from '@chakra-ui/react';
import React, { FC, useMemo } from 'react';
import LogoImage from 'assets/images/logo.png';
import LightLogoImage from 'assets/images/light-logo.png';

type LogoSize = 'small' | 'medium' | 'large';
type LogoType = 'light' | 'dark';

interface BrandLogoProps extends FlexProps {
  logoSize?: LogoSize;
  logoType?: LogoType;
  textColor?: TextProps['color'];
  textBackgroundColor?: TextProps['backgroundColor'];
  backgroundClip?: TextProps['backgroundClip'];
}

const BrandLogo: FC<BrandLogoProps> = ({
  logoSize = 'medium',
  logoType = 'dark',
  textColor,
  textBackgroundColor,
  backgroundClip,
  ...rest
}) => {
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
      <Image
        boxSize={boxSize}
        src={logoType === 'dark' ? LogoImage : LightLogoImage}
        objectFit="contain"
      />
      <Text
        ml="-16px"
        mb="4px"
        fontSize="xl"
        fontWeight="bold"
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
