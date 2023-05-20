import React, { ReactNode } from 'react';
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
import { ROUTES } from 'constant';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate(ROUTES.EDITOR);

  return (
    <Box bg="white" minHeight="100vh">
      <Box py={16}>
        <Flex direction={['column', 'column', 'row']} justify="center">
          <Box flex="1" pr={[0, 0, 8]} pl={[0, 0, 16]}>
            <Heading size="xl" mb={4}>
              Build Beautiful Code Snippets
            </Heading>
            <Text fontSize="lg" mb={6}>
              Create stunning code snippets for different programming languages
              with ease. Customize the appearance, choose from various
              templates, and enhance your code documentation.
            </Text>
            <Button
              _hover={{ background: 'gray.700' }}
              bg="gray.700"
              color="white"
              size="lg"
              onClick={handleGetStarted}
            >
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

      <Box bg="gray.100" py={16}>
        <Box maxWidth="container.md" mx="auto" px={4}>
          <Heading size="xl" mb={8} textAlign="center">
            Features
          </Heading>
          <Stack spacing={6}>
            <Feature
              icon={<RiDragDropLine size={50} />}
              title="Drag and Drop Interface"
              description="Easily drag and drop code elements to create your desired snippet structure."
            />
            <Feature
              icon={<BiCustomize size={50} />}
              title="Customize Appearance"
              description="Choose from a wide range of themes, fonts, and color schemes to make your snippets visually appealing."
            />
            <Feature
              icon={<DiTerminal size={50} />}
              title="Multi-Language Support"
              description="Create snippets for various programming languages, including JavaScript, Python, Java, and more."
            />
          </Stack>
        </Box>
      </Box>

      <Box py={16}>
        <Box maxWidth="container.md" mx="auto" px={4} textAlign="center">
          <Heading size="xl" mb={8}>
            Start Building Beautiful Code Snippets Today!
          </Heading>
          <Text fontSize="lg" mb={6}>
            With our drag and drop code snippet builder, you can effortlessly
            showcase your code in a visually appealing and professional manner.
          </Text>
          <Button
            _hover={{ background: 'gray.700' }}
            bg="gray.700"
            color="white"
            size="lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Box bg="gray.100" py={4}>
        <Box maxWidth="container.md" mx="auto" textAlign="center">
          <Text>Made with ❤️ by Sachin Chaurasiya</Text>
        </Box>
      </Box>
    </Box>
  );
};

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <Box>
    <Flex align="center" mb={2}>
      <Box boxSize={10}>{icon}</Box>
      <Heading size="md" ml={3}>
        {title}
      </Heading>
    </Flex>
    <Text>{description}</Text>
  </Box>
);

export default LandingPage;
