import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  useDisclosure,
  VStack,
  AbsoluteCenter,
  Icon,
} from '@chakra-ui/react';
import { ROUTES, SESSION_KEY } from 'constants/common';
import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '../Icons/GoogleIcon';
import GitHubIcon from '../Icons/GitHubIcon';
import { API_CLIENT } from 'api';
import {
  AuthFormData,
  AuthFormError,
  AuthFormProps,
} from './AuthForm.interface';
import { isEmpty, startCase } from 'lodash';
import { AppwriteException } from 'appwrite';
import { getDateByDateString } from 'utils/DateTimeUtils';

import Cookies from 'js-cookie';
import { validateForm } from 'utils/FormUtils';
import { useAppProvider } from 'AppProvider';
import PasswordInput from '../PasswordInput';
import { FiCode } from 'react-icons/fi';

const AuthForm: FC<AuthFormProps> = ({ formType }) => {
  const { onUpdateSession } = useAppProvider();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState<AuthFormError>({
    email: '',
    password: '',
  });

  const [formAPIError, setFormAPIError] = useState<string>('');

  const formAPI = useMemo(() => {
    return formType === 'signin'
      ? API_CLIENT.emailSignIn
      : API_CLIENT.emailSignUp;
  }, [formType]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError((prev) => ({
      ...prev,
      [name]: isEmpty(value) ? `${startCase(name)} is required` : '',
    }));
  };

  const handleSubmit = async () => {
    setFormAPIError('');

    const { isValid, errorObj } = validateForm<AuthFormData, AuthFormError>(
      formData
    );

    setFormError(errorObj);

    if (isValid) {
      try {
        setIsSubmitting(true);
        await formAPI(formData.email, formData.password);

        if (formType === 'signup') {
          navigate(ROUTES.SIGN_IN, { replace: true });
          toast({
            title: 'Account Created',
            description: 'Account created successfully!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        } else {
          const session = await API_CLIENT.getLoggedInUserSession();

          toast({
            title: 'Welcome Back',
            description: 'Logged in successfully!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });

          const expiry = getDateByDateString(session.expire);

          Cookies.set(SESSION_KEY, session.userId, { expires: expiry });
          onUpdateSession(session.userId);
          navigate(ROUTES.HOME, { replace: true });
          navigate(0);
        }
      } catch (error) {
        const exception = error as AppwriteException;
        const exceptionMessage =
          exception.type === 'general_argument_invalid'
            ? (exception.message.split(':')[1] || '').trim()
            : exception.message;

        setFormAPIError(exceptionMessage);
        onOpen();
        setTimeout(() => {
          onClose();
        }, 3000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Flex minH="100vh">
      {/* Left side - branding */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        flex={1}
        bgGradient="linear(135deg, brand.600, brand.500, brand.400)"
        align="center"
        justify="center"
        position="relative"
        overflow="hidden">
        {/* Decorative elements */}
        <Box
          position="absolute"
          top="15%"
          left="10%"
          w="200px"
          h="200px"
          bg="whiteAlpha.100"
          borderRadius="full"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="15%"
          w="150px"
          h="150px"
          bg="whiteAlpha.100"
          borderRadius="full"
        />

        <VStack spacing={6} px={12} position="relative" maxW="480px">
          <Flex
            w={16}
            h={16}
            borderRadius="2xl"
            bg="whiteAlpha.200"
            align="center"
            justify="center">
            <Icon as={FiCode} fontSize="2xl" color="white" />
          </Flex>
          <Heading color="white" size="xl" textAlign="center" lineHeight="1.2">
            Build stunning code snippets in seconds
          </Heading>
          <Text
            color="whiteAlpha.800"
            textAlign="center"
            fontSize="md"
            lineHeight="tall">
            Drag and drop elements, customize themes, and export beautiful code
            presentations for your blog, docs, or social media.
          </Text>
        </VStack>
      </Flex>

      {/* Right side - form */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        bg="white"
        px={{ base: 6, md: 12 }}
        pt={{ base: '100px', lg: 0 }}>
        <Box w="full" maxW="400px">
          <VStack spacing={2} align="start" mb={8}>
            <Heading size="lg" color="gray.900">
              {formType === 'signin' ? 'Welcome back' : 'Create an account'}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              {formType === 'signin' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <Link
                    to={ROUTES.SIGN_UP}
                    style={{ color: '#5E71E4', fontWeight: '600' }}>
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link
                    to={ROUTES.SIGN_IN}
                    style={{ color: '#5E71E4', fontWeight: '600' }}>
                    Sign in
                  </Link>
                </>
              )}
            </Text>
          </VStack>

          <Stack spacing={5}>
            {isOpen && formAPIError ? (
              <Alert
                status="error"
                variant="left-accent"
                borderRadius="lg"
                fontSize="sm">
                <AlertIcon />
                <AlertDescription>{formAPIError}</AlertDescription>
              </Alert>
            ) : null}

            {/* Social auth buttons */}
            <Stack spacing={3}>
              <Button
                variant="outline"
                leftIcon={<GoogleIcon />}
                borderRadius="lg"
                borderColor="gray.200"
                fontWeight="500"
                fontSize="sm"
                h="44px"
                _hover={{ bg: 'gray.50', borderColor: 'gray.300' }}
                onClick={API_CLIENT.googleSignIn}>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                leftIcon={<GitHubIcon />}
                borderRadius="lg"
                borderColor="gray.200"
                fontWeight="500"
                fontSize="sm"
                h="44px"
                _hover={{ bg: 'gray.50', borderColor: 'gray.300' }}
                onClick={API_CLIENT.githubSignIn}>
                Continue with GitHub
              </Button>
            </Stack>

            <Box position="relative" py={2}>
              <Divider borderColor="gray.200" />
              <AbsoluteCenter bg="white" px={4}>
                <Text fontSize="xs" color="gray.400" fontWeight="500">
                  OR
                </Text>
              </AbsoluteCenter>
            </Box>

            <FormControl
              id="email"
              isInvalid={Boolean(formError.email)}
              isRequired>
              <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="you@example.com"
                size="md"
                h="44px"
              />
              {formError.email && (
                <FormErrorMessage fontSize="xs">
                  {formError.email}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="password"
              isInvalid={Boolean(formError.password)}
              isRequired>
              <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
                Password
              </FormLabel>
              <PasswordInput
                value={formData.password}
                onChange={handleOnChange}
                size="md"
                h="44px"
              />
              {formError.password && (
                <FormErrorMessage fontSize="xs">
                  {formError.password}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button
              variant="brand"
              w="full"
              h="44px"
              fontSize="sm"
              onClick={handleSubmit}
              isLoading={isSubmitting}>
              {formType === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
