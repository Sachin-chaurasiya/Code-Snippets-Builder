import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { API_CLIENT } from 'api';
import { Models } from 'appwrite';
import Loader from 'components/Common/Loader/Loader';
import { BORDER_RADIUS_LARGE, PRIMARY_GRADIENT_COLOR } from 'constants/common';
import { isEqual } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getFormattedDate } from 'utils/DateTimeUtils';

interface StringDataState {
  current: string;
  updated: string;
  hasChanged: boolean;
  isUpdating: boolean;
}

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences>>();
  const [avatarUrl, setAvatarUrl] = useState<URL>();

  const [nameState, setNameState] = useState<StringDataState>({
    current: loggedInUser?.name ?? '',
    updated: loggedInUser?.name ?? '',
    hasChanged: false,
    isUpdating: false,
  });
  const [emailState, setEmailState] = useState<StringDataState>({
    current: loggedInUser?.email ?? '',
    updated: loggedInUser?.email ?? '',
    hasChanged: false,
    isUpdating: false,
  });
  const [passwordState, setPasswordState] = useState<StringDataState>({
    current: '',
    updated: '',
    hasChanged: false,
    isUpdating: false,
  });

  const [prefState, setPrefState] = useState<Record<string, string>>({
    twitter: '',
    linkedin: '',
    github: '',
  });

  const [isUpdatingPrefs, setIsUpdatingPrefs] = useState<boolean>(false);

  const fetchCurrentUserData = async () => {
    try {
      setIsLoading(true);
      const user = await API_CLIENT.getLoggedInUser();
      setLoggedInUser(user);
      setAvatarUrl(API_CLIENT.getAvatar(user.name));
      setNameState((prev) => ({
        ...prev,
        current: user.name,
        updated: user.name,
      }));
      setEmailState((prev) => ({
        ...prev,
        current: user.email,
        updated: user.email,
      }));
      setPrefState(user.prefs);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setNameState((prev) => ({
          ...prev,
          updated: value,
          hasChanged: prev.current !== value,
        }));

        break;
      case 'email':
        setEmailState((prev) => ({
          ...prev,
          updated: value,
          hasChanged: prev.current !== value,
        }));

        break;
      case 'password':
        setPasswordState((prev) => ({
          ...prev,
          updated: value,
          hasChanged: prev.current !== value,
        }));

        break;

      default:
        break;
    }
  };

  const handlePrefChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPrefState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameUpdate = async () => {
    try {
      setNameState((prev) => ({ ...prev, isUpdating: true }));
      const data = await API_CLIENT.account.updateName(nameState.updated);
      setLoggedInUser(data);
    } catch (error) {
      // handle error
    } finally {
      setNameState((prev) => ({ ...prev, isUpdating: false }));
    }
  };
  const handleEmailUpdate = async () => {
    try {
      setEmailState((prev) => ({ ...prev, isUpdating: true }));
      const data = await API_CLIENT.account.updateEmail(
        emailState.updated,
        loggedInUser?.password ?? ''
      );
      setLoggedInUser(data);
    } catch (error) {
      // handle error
    } finally {
      setEmailState((prev) => ({ ...prev, isUpdating: false }));
    }
  };
  const handlePasswordUpdate = async () => {
    try {
      setPasswordState((prev) => ({ ...prev, isUpdating: true }));
      const data = await API_CLIENT.account.updatePassword(
        passwordState.updated,
        loggedInUser?.password ?? ''
      );
      setLoggedInUser(data);
    } catch (error) {
      // handle error
    } finally {
      setPasswordState((prev) => ({ ...prev, isUpdating: false }));
    }
  };

  const handlePrefUpdate = async () => {
    try {
      setIsUpdatingPrefs(true);
      const data = await API_CLIENT.account.updatePrefs(prefState);
      setLoggedInUser(data);
    } catch (error) {
      // handle error
    } finally {
      setIsUpdatingPrefs(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserData().catch(() => {
      // handle error
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack spacing={4}>
      <Box
        direction="row"
        justifyContent="space-between"
        as={Stack}
        bg="white"
        p={4}
        width="full"
        border="1px"
        borderColor="gray.200"
        borderRadius={BORDER_RADIUS_LARGE}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Image
            src={avatarUrl?.href}
            borderRadius="50%"
            height={16}
            width={16}
          />
          <Heading as="h6" size="sm">
            {loggedInUser?.name}
          </Heading>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Text>{loggedInUser?.email}</Text>
          <Text>{`Joined: ${getFormattedDate(
            loggedInUser?.$createdAt ?? ''
          )}`}</Text>
        </Stack>
        <Badge
          p={2}
          borderRadius={BORDER_RADIUS_LARGE}
          alignSelf="center"
          height="max-content"
          variant="solid"
          colorScheme={loggedInUser?.emailVerification ? 'green' : 'red'}>
          {loggedInUser?.emailVerification ? 'verified' : 'unverified'}
        </Badge>
      </Box>
      <Box
        direction="row"
        justifyContent="space-between"
        as={Stack}
        bg="white"
        p={4}
        width="full"
        border="1px"
        borderColor="gray.200"
        borderRadius={BORDER_RADIUS_LARGE}>
        <Heading as="h6" size="sm" flex={1} alignSelf="center">
          Update Name
        </Heading>
        <Stack direction="column" flex={1}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              value={nameState.updated}
              onChange={handleOnChange}
            />
          </FormControl>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            alignSelf="end"
            isDisabled={!nameState.hasChanged}
            isLoading={nameState.isUpdating}
            onClick={handleNameUpdate}>
            Update
          </Button>
        </Stack>
      </Box>
      <Box
        direction="row"
        justifyContent="space-between"
        as={Stack}
        bg="white"
        p={4}
        width="full"
        border="1px"
        borderColor="gray.200"
        borderRadius={BORDER_RADIUS_LARGE}>
        <Heading as="h6" size="sm" flex={1} alignSelf="center">
          Update Email
        </Heading>
        <Stack direction="column" flex={1}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={emailState.updated}
              onChange={handleOnChange}
            />
          </FormControl>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            alignSelf="end"
            isDisabled={!emailState.hasChanged}
            isLoading={emailState.isUpdating}
            onClick={handleEmailUpdate}>
            Update
          </Button>
        </Stack>
      </Box>
      <Box
        direction="row"
        justifyContent="space-between"
        as={Stack}
        bg="white"
        p={4}
        width="full"
        border="1px"
        borderColor="gray.200"
        borderRadius={BORDER_RADIUS_LARGE}>
        <Stack flex={1}>
          <Heading as="h6" size="sm">
            Update Password
          </Heading>
          <Text>A password must contain at least 8 characters.</Text>
        </Stack>
        <Stack direction="column" flex={1}>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter new password"
              value={passwordState.updated}
              onChange={handleOnChange}
            />
          </FormControl>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            alignSelf="end"
            isDisabled={!passwordState.hasChanged}
            isLoading={passwordState.isUpdating}
            onClick={handlePasswordUpdate}>
            Update
          </Button>
        </Stack>
      </Box>
      <Box
        direction="row"
        justifyContent="space-between"
        as={Stack}
        bg="white"
        p={4}
        width="full"
        border="1px"
        borderColor="gray.200"
        borderRadius={BORDER_RADIUS_LARGE}>
        <Stack flex={1}>
          <Heading as="h6" size="sm">
            Update Social usernames
          </Heading>
          <Text>
            These usernames will be use to show the profile info on snippet.
          </Text>
        </Stack>
        <Stack direction="column" flex={1}>
          <FormControl id="twitter">
            <FormLabel>Twitter</FormLabel>
            <Input
              name="twitter"
              type="text"
              placeholder="@sachindotcom"
              value={prefState.twitter}
              onChange={handlePrefChange}
            />
          </FormControl>
          <FormControl id="github">
            <FormLabel>GitHub</FormLabel>
            <Input
              name="github"
              type="text"
              placeholder="Sachin-chaurasiya"
              value={prefState.github}
              onChange={handlePrefChange}
            />
          </FormControl>
          <FormControl id="linkedin">
            <FormLabel>LinkedIn</FormLabel>
            <Input
              name="linkedin"
              type="text"
              placeholder="sachin-chaurasiya"
              value={prefState.linkedin}
              onChange={handlePrefChange}
            />
          </FormControl>
          <Button
            _hover={{
              bgGradient: PRIMARY_GRADIENT_COLOR,
            }}
            bgGradient={PRIMARY_GRADIENT_COLOR}
            color="white"
            alignSelf="end"
            onClick={handlePrefUpdate}
            isLoading={isUpdatingPrefs}
            isDisabled={isEqual(loggedInUser?.prefs, prefState)}>
            Update
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default DashboardPage;
