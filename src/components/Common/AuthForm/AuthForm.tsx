import {
  AbsoluteCenter,
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
} from 'constants/common';
import React, { FC } from 'react';
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError((prev) => ({
      ...prev,
      [name]: isEmpty(value) ? `${startCase(name)} is required` : '',
    }));
  };

  const validateForm = (data: AuthFormData) => {
    let isValid = true;
    for (const key in data) {
      if (isEmpty(data[key as keyof AuthFormData])) {
        isValid = false;
        setFormError((prev) => ({
          ...prev,
          [key]: `${startCase(key)} is required`,
        }));
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    const isFormValid = validateForm({
      email: formData.email,
      password: formData.password,
    });

    const api =
      formType === 'login' ? API_CLIENT.emailLogin : API_CLIENT.emailSignUp;

    if (isFormValid) {
      try {
        setIsSubmitting(true);
        const session = await api(
          formData.email,
          formData.password,
          formData.name
        );
        if (session) {
          navigate(ROUTES.EDITOR);
        }
      } catch (error) {
        // handle error
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
          <FormControl id="email" isInvalid={Boolean(formError.email)}>
            <FormLabel>Email address</FormLabel>
            <Input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
            />
            {formError.email && (
              <FormErrorMessage>{formError.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={Boolean(formError.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              required
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
