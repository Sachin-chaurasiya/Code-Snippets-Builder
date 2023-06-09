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
} from '@chakra-ui/react';
import {
  BORDER_RADIUS_MEDIUM,
  PRIMARY_GRADIENT_COLOR,
  ROUTES,
  SESSION_KEY,
} from 'constants/common';
import React, { FC, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '../Icons/GoogleIcon';
import GitHubIcon from '../Icons/GitHubIcon';
import { API_CLIENT } from 'api';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import {
  AuthFormData,
  AuthFormError,
  AuthFormProps,
} from './AuthForm.interface';
import { isEmpty, startCase } from 'lodash';
import { AppwriteException } from 'appwrite';
import { getDateByDateString } from 'utils/DateTimeUtil';

import Cookies from 'js-cookie';
import { validateForm } from 'utils/FormUtils';

const AuthForm: FC<AuthFormProps> = ({ formType }) => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState<AuthFormError>({
    email: '',
    password: '',
  });

  const [formAPIError, setFormAPIError] = useState<string>('');

  const formAPI = useMemo(() => {
    return formType === 'login'
      ? API_CLIENT.emailLogin
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
    const { isValid, errorObj } = validateForm<AuthFormData, AuthFormError>({
      email: formData.email,
      password: formData.password,
    });

    setFormError(errorObj);

    // make api call if form data is valid
    if (isValid) {
      try {
        setIsSubmitting(true);
        await formAPI(formData.email, formData.password, formData.name);

        const session = await API_CLIENT.getLoggedInUserSession();

        const expiry = getDateByDateString(session.expire);

        // store the session
        Cookies.set(SESSION_KEY, session.userId, { expires: expiry });

        navigate(ROUTES.HOME);
      } catch (error) {
        const exception = error as AppwriteException;
        setFormAPIError(exception.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack
        spacing={8}
        bg="white"
        px={4}
        py={6}
        flex={0.5}
        shadow="md"
        borderRadius={BORDER_RADIUS_MEDIUM}>
        <Stack spacing={4}>
          <Box alignSelf="center">
            <Heading textAlign="center">
              {formType === 'login' ? 'Login' : 'Sign Up'}
            </Heading>
            <Text>
              {formType === 'login' ? (
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
                    to={ROUTES.LOGIN}
                    style={{ textDecoration: 'underline' }}>
                    Login
                  </Link>
                </>
              )}
            </Text>
          </Box>

          {formAPIError ? (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              <AlertDescription>{formAPIError}</AlertDescription>
            </Alert>
          ) : null}

          {formType === 'signup' ? (
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleOnChange}
              />
            </FormControl>
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
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
            />
            {formError.password && (
              <FormErrorMessage>{formError.password}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            onClick={handleSubmit}
            isLoading={isSubmitting}>
            {formType === 'login' ? 'Login' : 'Sign Up'}
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
            onClick={API_CLIENT.googleLogin}>
            Continue with Google
          </Button>
          <Button
            _hover={{ bg: 'white' }}
            leftIcon={<GitHubIcon />}
            bg="white"
            border="1px"
            onClick={API_CLIENT.githubLogin}>
            Continue with GitHub
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AuthForm;
