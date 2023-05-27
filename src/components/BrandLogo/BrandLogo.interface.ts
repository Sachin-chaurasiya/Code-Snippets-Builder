import { FlexProps, TextProps } from '@chakra-ui/react';

export type LogoSize = 'small' | 'medium' | 'large';
export type LogoType = 'light' | 'dark';

export interface BrandLogoProps extends FlexProps {
  logoSize?: LogoSize;
  logoType?: LogoType;
  textColor?: TextProps['color'];
  textBackgroundColor?: TextProps['backgroundColor'];
  backgroundClip?: TextProps['backgroundClip'];
}
