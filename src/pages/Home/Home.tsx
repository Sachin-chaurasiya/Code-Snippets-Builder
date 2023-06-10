import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Stack,
} from '@chakra-ui/react';
import CodeSnippetImage from 'assets/images/code-snippet.png';
import { RiDragDropLine } from 'react-icons/ri';
import { BiCustomize } from 'react-icons/bi';
import { DiTerminal } from 'react-icons/di';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_GRADIENT_COLOR, ROUTES } from 'constants/common';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { Feature } from 'components/Feature/Feature';
import Footer from 'components/Common/Footer/Footer';
import { useAppProvider } from 'AppProvider';

const LandingPage = () => {
  const { session } = useAppProvider();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(ROUTES.EDITOR);
  };

  return (
    <Box bg="white" minHeight="100vh" mt={session ? '' : '64px'}>
      <Box py={16}>
        <Flex direction={['column', 'column', 'row']} justify="center">
          <Box
            flex="1"
            pr={[0, 0, 8]}
            pl={[0, 0, 16]}
            alignSelf={session ? '' : 'center'}>
            <Heading size="xl" mb={4} {...COMMON_TEXT_PROPS}>
              Build Beautiful Code Snippets
            </Heading>
            <Text fontSize="lg" mb={6}>
              Create stunning code snippets for different programming languages
              with ease. Customize the appearance, choose from various
              templates, and enhance your code documentation.
            </Text>
            <Button
              _hover={{
                bgGradient: PRIMARY_GRADIENT_COLOR,
              }}
              bgGradient={PRIMARY_GRADIENT_COLOR}
              color="white"
              size="lg"
              onClick={handleGetStarted}>
              Get Started
            </Button>
          </Box>
          <Box flex="1" pr={[0, 0, 8]} pl={[0, 0, 16]}>
            <Image
              src={CodeSnippetImage}
              alt="Code Snippet Builder"
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Box>

      <Box bg={PRIMARY_GRADIENT_COLOR} py={16}>
        <Box maxWidth="container.md" mx="auto" px={4}>
          <Heading color="white" size="xl" mb={8} textAlign="center">
            Features
          </Heading>
          <Stack spacing={6}>
            <Feature
              icon={<RiDragDropLine size={50} color="white" />}
              title="Drag and Drop Interface"
              description="Easily drag and drop code elements to create your desired snippet structure."
            />
            <Feature
              icon={<BiCustomize size={50} color="white" />}
              title="Customize Appearance"
              description="Choose from a wide range of themes, fonts, and color schemes to make your snippets visually appealing."
            />
            <Feature
              icon={
                <DiTerminal
                  size={50}
                  color="white"
                  style={{ marginTop: '-8px' }}
                />
              }
              title="Multi-Language Support"
              description="Create snippets for various programming languages, including JavaScript, Python, Java, and more."
            />
          </Stack>
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
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            size="lg"
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
