import {
  Badge,
  Box,
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
import UpdateButton from 'components/Common/UpdateButton';
import { BORDER_RADIUS_LARGE } from 'constants/common';
import { isEqual } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getFormattedDate } from 'utils/DateTimeUtils';

interface StringDataState {
  current: string;
  updated: string;
  hasChanged: boolean;
  isUpdating: boolean;
}

const initialNameState = {
  current: '',
  updated: '',
  hasChanged: false,
  isUpdating: false,
};

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences>>();
  const [avatarUrl, setAvatarUrl] = useState<URL>();

  const [nameState, setNameState] = useState<StringDataState>(initialNameState);

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
      setNameState(initialNameState);
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
    if (loggedInUser) {
      setNameState((prev) => ({
        ...prev,
        current: loggedInUser.name,
        updated: loggedInUser.name,
      }));
      setPrefState(loggedInUser.prefs);
    }
  }, [loggedInUser]);

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
          <UpdateButton
            isDisabled={!nameState.hasChanged}
            isLoading={nameState.isUpdating}
            onClick={handleNameUpdate}>
            Update
          </UpdateButton>
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
          <UpdateButton
            onClick={handlePrefUpdate}
            isLoading={isUpdatingPrefs}
            isDisabled={isEqual(loggedInUser?.prefs, prefState)}>
            Update
          </UpdateButton>
        </Stack>
      </Box>
    </Stack>
  );
};

export default DashboardPage;
