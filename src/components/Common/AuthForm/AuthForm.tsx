import {
  AbsoluteCenter,
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
} from '@chakra-ui/react';
import {
  BORDER_RADIUS_MEDIUM,
  BRAND_BORDER_RADIUS,
  ROUTES,
  SESSION_KEY,
} from 'constants/common';
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

  /**
   * handle the form input changes
   * @param e ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError((prev) => ({
      ...prev,
      [name]: isEmpty(value) ? `${startCase(name)} is required` : '',
    }));
  };

  /**
   * handle the form submit
   */
  const handleSubmit = async () => {
    // reset the api error first
    setFormAPIError('');

    // validate the form data
    const { isValid, errorObj } = validateForm<AuthFormData, AuthFormError>(
      formData
    );

    setFormError(errorObj);

    // make api call if form data is valid
    if (isValid) {
      try {
        setIsSubmitting(true);
        await formAPI(formData.email, formData.password);

        if (formType === 'signup') {
          navigate(ROUTES.SIGN_IN, { replace: true });
          toast({
            title: 'Singed Up',
            description: 'Account created successfully!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        } else {
          const session = await API_CLIENT.getLoggedInUserSession();

          toast({
            title: 'Singed In',
            description: 'Logged In successfully!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });

          const expiry = getDateByDateString(session.expire);

          // store the session
          Cookies.set(SESSION_KEY, session.userId, { expires: expiry });

          // update the session
          onUpdateSession(session.userId);

          // navigate to home
          navigate(ROUTES.HOME, { replace: true });

          // reload the page
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
    <Flex
      minH="100vh"
      paddingTop="100px"
      align="center"
      justify="center"
      bg="white">
      <Stack
        border="1px solid #dce1f9"
        spacing={8}
        bg="white"
        px={4}
        py={6}
        flex={{ lg: 0.35, md: 0.5, sm: 0.8 }}
        shadow="md"
        borderRadius={BORDER_RADIUS_MEDIUM}>
        <Stack spacing={4}>
          <Box alignSelf="center">
            <Heading pb={2} as="h3" size="lg" textAlign="center">
              {formType === 'signin' ? 'Sign In' : 'Sign Up'}
            </Heading>
            <Text pb={4}>
              {formType === 'signin' ? (
                <>
                  Don&apos;t have an account ?{' '}
                  <Link
                    to={ROUTES.SIGN_UP}
                    style={{ textDecoration: 'underline' }}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account ?{' '}
                  <Link
                    to={ROUTES.SIGN_IN}
                    style={{ textDecoration: 'underline' }}>
                    SignIn
                  </Link>
                </>
              )}
            </Text>
          </Box>

          {isOpen && formAPIError ? (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              <AlertDescription>{formAPIError}</AlertDescription>
            </Alert>
          ) : null}

          <FormControl
            id="email"
            isInvalid={Boolean(formError.email)}
            isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
            {formError.email && (
              <FormErrorMessage>{formError.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="password"
            isInvalid={Boolean(formError.password)}
            isRequired>
            <FormLabel>Password</FormLabel>
            <PasswordInput
              value={formData.password}
              onChange={handleOnChange}
            />
            {formError.password && (
              <FormErrorMessage>{formError.password}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            _hover={{
              bg: 'brand.500',
            }}
            bg="brand.500"
            borderRadius={BRAND_BORDER_RADIUS}
            color="white"
            onClick={handleSubmit}
            isLoading={isSubmitting}>
            {formType === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
          <Box position="relative" py={4}>
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              OR
            </AbsoluteCenter>
          </Box>
          {/* Social Auth provider : google, github */}
          <Button
            _hover={{ bg: 'white' }}
            leftIcon={<GoogleIcon />}
            bg="white"
            border="1px"
            borderColor={'gray.400'}
            borderRadius={BRAND_BORDER_RADIUS}
            onClick={API_CLIENT.googleSignIn}>
            Continue with Google
          </Button>
          <Button
            _hover={{ bg: 'white' }}
            leftIcon={<GitHubIcon />}
            bg="white"
            border="1px"
            borderColor={'gray.400'}
            borderRadius={BRAND_BORDER_RADIUS}
            onClick={API_CLIENT.githubSignIn}>
            Continue with GitHub
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AuthForm;
