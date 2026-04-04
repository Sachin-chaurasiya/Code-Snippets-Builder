import { Box, BoxProps, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import Slider, { Settings } from 'react-slick';
import CodeSnippetImage from 'assets/images/code-snippet.png';
import HtmlCodeSnippetImage from 'assets/images/html-code-snippet.png';
import TypeScriptCodeSnippetImage from 'assets/images/typescript-code-snippet.png';

const CAROUSEL_IMAGES = [
  TypeScriptCodeSnippetImage,
  CodeSnippetImage,
  HtmlCodeSnippetImage,
];

const settings: Settings = {
  dots: false,
  arrows: false,
  fade: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderComponent = Slider as unknown as React.ComponentType<
  Settings & { children: React.ReactNode }
>;

const HomeCarousel: FC<BoxProps> = (props) => {
  return (
    <Box position="relative" width="auto" height="auto" {...props}>
      <SliderComponent {...settings}>
        {CAROUSEL_IMAGES.map((url, index) => (
          <Image
            loading="eager"
            key={index}
            src={url}
            alt="Code Snippet Builder"
            objectFit="contain"
          />
        ))}
      </SliderComponent>
    </Box>
  );
};

export default HomeCarousel;
