import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BORDER_RADIUS_LARGE, PRIMARY_GRADIENT_COLOR } from 'constants/common';
import { map } from 'lodash';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

const TEMPLATES = ['template1', 'template2', 'template3', 'template4'];

const DashboardPage = () => {
  return (
    <Box bg="white" minH="100vh" borderRadius={BORDER_RADIUS_LARGE} p={4}>
      <Stack spacing={6}>
        <Flex gap={4}>
          <Heading>Your Snippets</Heading>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            leftIcon={<BsPlus />}
            pl={2}>
            New
          </Button>
        </Flex>
        <Stack spacing={4}>
          <Heading as="h4" size="md">
            Templates
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {map(TEMPLATES, (template) => (
              <AspectRatio
                ratio={1}
                maxHeight="200px"
                border="1px"
                borderStyle="dashed"
                borderColor="gray.400"
                borderRadius={BORDER_RADIUS_LARGE}>
                <Button bg="transparent" _hover={{ background: 'gray.100' }}>
                  <Text>{template}</Text>
                </Button>
              </AspectRatio>
            ))}
          </Grid>
        </Stack>
        <Divider variant="dashed" />
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <AspectRatio
            ratio={1}
            maxHeight="200px"
            border="1px"
            borderStyle="dashed"
            borderColor="gray.400"
            borderRadius={BORDER_RADIUS_LARGE}>
            <Button bg="transparent" _hover={{ background: 'gray.100' }}>
              <Stack align="center" justify="center" color={'gray.500'}>
                <BsPlus fontSize={64} />
                <Text>Add snippet</Text>
              </Stack>
            </Button>
          </AspectRatio>
        </Grid>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
