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
  fade: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const HomeCarousel: FC<BoxProps> = (props) => {
  return (
    <Box position="relative" width="auto" height="auto" {...props}>
      <Slider {...settings}>
        {CAROUSEL_IMAGES.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt="Code Snippet Builder"
            objectFit="contain"
          />
        ))}
      </Slider>
    </Box>
  );
};

export default HomeCarousel;
