import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  VStack,
  HStack,
  Icon,
  Flex,
  Badge,
} from '@chakra-ui/react';

import { RiDragDropLine } from 'react-icons/ri';
import { BiCustomize } from 'react-icons/bi';
import { DiTerminal } from 'react-icons/di';
import { FiArrowRight, FiZap, FiLayers, FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BRAND_COLOR, ROUTES, STATS } from 'constants/common';
import { Feature } from 'components/Feature/Feature';
import Footer from 'components/Common/Footer/Footer';
import HomeCarousel from 'components/HomeCarousel';
import { useAppProvider } from 'AppProvider';
import StatsCard from 'components/StatsCard/StatsCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const { session } = useAppProvider();

  const handleGetStarted = () => {
    navigate(session ? ROUTES.DASHBOARD : ROUTES.SIGN_UP);
  };

  return (
    <Box bg="white" minHeight="100vh">
      {/* Hero Section */}
      <Box
        position="relative"
        overflow="hidden"
        pt={{ base: '120px', md: '160px' }}
        pb={{ base: 16, md: 24 }}>
        {/* Background decoration */}
        <Box
          position="absolute"
          top="-200px"
          right="-200px"
          w="600px"
          h="600px"
          bg="brand.50"
          borderRadius="full"
          filter="blur(80px)"
          opacity={0.6}
        />
        <Box
          position="absolute"
          bottom="-100px"
          left="-100px"
          w="400px"
          h="400px"
          bg="brand.100"
          borderRadius="full"
          filter="blur(60px)"
          opacity={0.4}
        />

        <VStack
          spacing={8}
          justifyContent="center"
          alignItems="center"
          position="relative"
          maxW="container.xl"
          mx="auto"
          px={{ base: 6, md: 8 }}>
          <Badge
            colorScheme="brand"
            bg="brand.50"
            color="brand.600"
            px={4}
            py={1.5}
            borderRadius="full"
            fontSize="xs"
            fontWeight="600"
            textTransform="none"
            letterSpacing="0.01em">
            Free & Open Source
          </Badge>

          <VStack spacing={5} textAlign="center" maxW="720px">
            <Heading
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight={800}
              color="gray.900"
              lineHeight="1.1"
              letterSpacing="-0.03em">
              Build Beautiful{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, brand.500, brand.300)"
                bgClip="text">
                Code Snippets
              </Text>
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.500"
              maxW="560px"
              lineHeight="1.7">
              Create stunning code snippets with our drag-and-drop builder.
              Customize themes, export in multiple formats, and share your code
              beautifully.
            </Text>
          </VStack>

          <HStack spacing={4}>
            <Button
              variant="brand"
              size="lg"
              rightIcon={<FiArrowRight />}
              onClick={handleGetStarted}>
              Start Building
            </Button>
            <Button
              variant="ghost"
              size="lg"
              color="gray.600"
              borderRadius="full"
              _hover={{ bg: 'gray.100' }}
              onClick={() => {
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Learn More
            </Button>
          </HStack>

          {/* Carousel */}
          <Box
            mt={8}
            w="full"
            maxW="800px"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            border="1px solid"
            borderColor="gray.100">
            <HomeCarousel width="full" />
          </Box>
        </VStack>
      </Box>

      {/* Stats Section */}
      <Box bg="gray.50" py={{ base: 12, md: 16 }} px={{ base: 6, md: 8 }}>
        <Grid
          maxW="container.lg"
          mx="auto"
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={6}>
          {STATS.map(({ description, value }, index) => (
            <StatsCard
              index={index}
              key={description}
              count={value}
              description={description}
            />
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        bgGradient="linear(135deg, brand.600, brand.500, brand.400)"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 8 }}
        position="relative"
        overflow="hidden">
        {/* Decorative circles */}
        <Box
          position="absolute"
          top="10%"
          left="5%"
          w="200px"
          h="200px"
          bg="whiteAlpha.50"
          borderRadius="full"
        />
        <Box
          position="absolute"
          bottom="10%"
          right="5%"
          w="300px"
          h="300px"
          bg="whiteAlpha.50"
          borderRadius="full"
        />

        <Box maxW="container.lg" mx="auto" position="relative">
          <VStack spacing={4} mb={12} textAlign="center">
            <Text
              fontSize="sm"
              fontWeight="700"
              color="whiteAlpha.700"
              textTransform="uppercase"
              letterSpacing="wider">
              Features
            </Text>
            <Heading size="xl" color="white" maxW="lg">
              Everything you need to create stunning snippets
            </Heading>
          </VStack>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}>
            <Feature
              icon={<RiDragDropLine color={BRAND_COLOR} size={28} />}
              title="Drag & Drop"
              description="Easily drag and drop code, text, and image elements to create your desired snippet layout."
            />
            <Feature
              icon={<BiCustomize size={28} color={BRAND_COLOR} />}
              title="Fully Customizable"
              description="Choose from 30+ themes, custom fonts, gradients, and color schemes for visually appealing snippets."
            />
            <Feature
              icon={<DiTerminal size={28} color={BRAND_COLOR} />}
              title="100+ Languages"
              description="Syntax highlighting for JavaScript, Python, TypeScript, Go, Rust, and 100+ more languages."
            />
          </Grid>
        </Box>
      </Box>

      {/* How it works */}
      <Box py={{ base: 16, md: 24 }} px={{ base: 6, md: 8 }} bg="white">
        <Box maxW="container.lg" mx="auto">
          <VStack spacing={4} mb={14} textAlign="center">
            <Text
              fontSize="sm"
              fontWeight="700"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wider">
              How it works
            </Text>
            <Heading size="xl" color="gray.900" maxW="lg">
              Three steps to beautiful code
            </Heading>
          </VStack>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={10}>
            {[
              {
                icon: FiZap,
                step: '01',
                title: 'Create a snippet',
                desc: 'Start from scratch or pick a template. Add code, text, and images to your canvas.',
              },
              {
                icon: FiLayers,
                step: '02',
                title: 'Customize it',
                desc: 'Choose your theme, background gradient, font size, and arrange elements perfectly.',
              },
              {
                icon: FiDownload,
                step: '03',
                title: 'Export & share',
                desc: 'Download as PNG, JPEG, or SVG. Share your beautiful code snippets anywhere.',
              },
            ].map(({ icon, step, title, desc }) => (
              <VStack
                key={step}
                spacing={5}
                align="start"
                p={8}
                borderRadius="2xl"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.2s"
                _hover={{
                  borderColor: 'brand.200',
                  transform: 'translateY(-2px)',
                }}>
                <Flex
                  align="center"
                  justify="center"
                  w={12}
                  h={12}
                  borderRadius="xl"
                  bg="brand.500"
                  color="white">
                  <Icon as={icon} fontSize="xl" />
                </Flex>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  color="brand.400"
                  letterSpacing="wider">
                  STEP {step}
                </Text>
                <Heading size="md" color="gray.900">
                  {title}
                </Heading>
                <Text fontSize="sm" color="gray.500" lineHeight="tall">
                  {desc}
                </Text>
              </VStack>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Final CTA */}
      <Box py={{ base: 16, md: 24 }} px={{ base: 6, md: 8 }} bg="gray.50">
        <Box
          maxW="container.md"
          mx="auto"
          textAlign="center"
          bg="white"
          borderRadius="3xl"
          p={{ base: 10, md: 16 }}
          border="1px solid"
          borderColor="gray.100"
          boxShadow="0 4px 40px rgba(0, 0, 0, 0.04)"
          position="relative"
          overflow="hidden">
          <Box
            position="absolute"
            top="-50px"
            right="-50px"
            w="200px"
            h="200px"
            bg="brand.50"
            borderRadius="full"
            opacity={0.5}
          />
          <VStack spacing={6} position="relative">
            <Heading
              size="xl"
              color="gray.900"
              lineHeight="1.2"
              letterSpacing="-0.02em">
              Ready to build beautiful snippets?
            </Heading>
            <Text fontSize="md" color="gray.500" maxW="md">
              Join thousands of developers who use SnippetBuilder to create
              professional code presentations.
            </Text>
            <Button
              variant="brand"
              size="lg"
              rightIcon={<FiArrowRight />}
              onClick={handleGetStarted}>
              Get Started Free
            </Button>
          </VStack>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
