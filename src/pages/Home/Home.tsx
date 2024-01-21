import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  VStack,
  Image,
} from '@chakra-ui/react';

import { RiDragDropLine } from 'react-icons/ri';
import { BiCustomize } from 'react-icons/bi';
import { DiTerminal } from 'react-icons/di';
import { useNavigate } from 'react-router-dom';
import { BRAND_BORDER_RADIUS, BRAND_COLOR, ROUTES } from 'constants/common';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { Feature } from 'components/Feature/Feature';
import Footer from 'components/Common/Footer/Footer';
import HomeCarousel from 'components/HomeCarousel';
import ArrowImage from 'assets/svg/arrow-image.svg';
import { useAppProvider } from 'AppProvider';

const LandingPage = () => {
  const navigate = useNavigate();
  const { session } = useAppProvider();

  const handleGetStarted = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <Box bg="white" minHeight="100vh">
      <Box padding={session ? '6rem' : '12rem'}>
        <VStack
          spacing={16}
          justifyContent="center"
          alignItems="center"
          position="relative">
          <Box textAlign="center">
            <Image
              src={ArrowImage}
              position="absolute"
              top="auto"
              bottom="58%"
              right="auto"
              left="4%"
            />
            <Heading size="4xl" fontWeight={700} mb={4} color="black">
              Build Beautiful Code Snippets
            </Heading>
            <Text fontSize="xl" mb={6} color="#344054">
              Create stunning code snippets for different programming languages
              with ease. Customize the appearance, choose from various
              templates, and enhance your code documentation.
            </Text>
            <Button
              _hover={{
                bg: 'brand.500',
              }}
              bg="brand.500"
              borderRadius={BRAND_BORDER_RADIUS}
              color="white"
              size="xl"
              onClick={handleGetStarted}>
              Get Started
            </Button>
          </Box>

          <HomeCarousel width="700px" />
        </VStack>
      </Box>

      <Box bg="brand.500" py={16}>
        <Box maxWidth="container.lg" mx="auto" px={4}>
          <Heading color="white" size="xl" mb={8} textAlign="center">
            Features
          </Heading>
          <Grid as={Grid} templateColumns="repeat(3, 1fr)" gap={8}>
            <Feature
              icon={<RiDragDropLine color={BRAND_COLOR} size={50} />}
              title="Drag and Drop Interface"
              description="Easily drag and drop code elements to create your desired snippet structure."
            />
            <Feature
              icon={<BiCustomize size={50} color={BRAND_COLOR} />}
              title="Customize Appearance"
              description="Choose from a wide range of themes, fonts, and color schemes to make your snippets visually appealing."
            />
            <Feature
              icon={
                <DiTerminal
                  size={50}
                  color={BRAND_COLOR}
                  style={{ marginTop: '-8px' }}
                />
              }
              title="Multi-Language Support"
              description="Create snippets for various programming languages, including JavaScript, Python, Java, and more."
            />
          </Grid>
        </Box>
      </Box>

      <Box py={16}>
        <Box maxWidth="container.md" mx="auto" px={4} textAlign="center">
          <Heading size="xl" mb={8} {...COMMON_TEXT_PROPS}>
            Start Building Beautiful Code Snippets Today!
          </Heading>
          <Text fontSize="lg" mb={6}>
            With our drag and drop code snippet builder, you can effortlessly
            showcase your code in a visually appealing and professional manner.
          </Text>
          <Button
            _hover={{
              bg: 'brand.500',
            }}
            bg="brand.500"
            color="white"
            borderRadius={BRAND_BORDER_RADIUS}
            size="xl"
            onClick={handleGetStarted}>
            Get Started
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
