import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { API_CLIENT } from 'api';
import { Models } from 'appwrite';
import CustomSwitch from 'components/Common/CustomSwitch/CustomSwitch';
import { SUPPORTED_PROFILES } from 'constants/profile';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { EditorSidebarProps } from 'interfaces/Editor.interface';
import { get, map } from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';

const ProfileConfig: FC<
  Pick<EditorSidebarProps, 'profile' | 'onUpdateProfileData'>
> = ({ profile, onUpdateProfileData }) => {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCurrentUserData = async () => {
    try {
      setIsLoading(true);
      const user = await API_CLIENT.getLoggedInUser();
      setLoggedInUser(user);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      const username = get(loggedInUser?.prefs, profile.platform);
      onUpdateProfileData({ ...profile, username });
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  const platformUserName = useMemo(() => {
    return get(loggedInUser?.prefs, profile.platform);
  }, [loggedInUser, profile]);

  if (isLoading) {
    return <Spinner display="block" margin="auto" />;
  }

  return (
    <Box alignItems="flex-start" as={VStack} mb={4}>
      <Text fontSize="lg" fontWeight="bold" {...COMMON_TEXT_PROPS}>
        Profile Info
      </Text>
      <Divider />
      <VStack w="100%" alignItems="flex-start">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="profile-info" mb="0">
            Show profile info
          </FormLabel>
          <CustomSwitch
            id="profile-info"
            isChecked={Boolean(profile.isVisible)}
            onChange={(e) => {
              onUpdateProfileData({ ...profile, isVisible: e.target.checked });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Platform</FormLabel>
          <Select
            value={profile.platform}
            onChange={(e) => {
              onUpdateProfileData({
                ...profile,
                platform: e.target.value,
                username: get(loggedInUser?.prefs, e.target.value),
              });
            }}>
            {map(SUPPORTED_PROFILES, ({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input isReadOnly value={platformUserName} />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ProfileConfig;
