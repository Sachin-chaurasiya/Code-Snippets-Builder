import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import CustomSwitch from 'components/Common/CustomSwitch/CustomSwitch';
import { BORDER_RADIUS_MEDIUM } from 'constants/common';
import { SUPPORTED_PROFILES } from 'constants/profile';
import { COMMON_TEXT_PROPS } from 'constants/text';
import { EditorSidebarProps } from 'interfaces/Editor.interface';
import { get, map } from 'lodash';
import React, { FC, useEffect, useMemo } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

const ProfileConfig: FC<
  Pick<EditorSidebarProps, 'profile' | 'onUpdateProfileData'>
> = ({ profile, onUpdateProfileData }) => {
  const { loggedInUser, isFetchingUser } = useAppProvider();

  useEffect(() => {
    if (loggedInUser) {
      const username = get(loggedInUser?.prefs, profile.platform);
      onUpdateProfileData({ ...profile, username });
    }
  }, [loggedInUser]);

  const platformUserName = useMemo(() => {
    return get(loggedInUser?.prefs, profile.platform);
  }, [loggedInUser, profile]);

  if (isFetchingUser) {
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
          <FormLabel>
            <Tooltip
              label="This is the username you use on social media. If you want to change it, you can do so by updating your profile information."
              borderRadius={BORDER_RADIUS_MEDIUM}
              placement="top">
              <Stack align="center" direction="row" gap={1}>
                <Text>Username</Text>
                <BsInfoCircle />
              </Stack>
            </Tooltip>
          </FormLabel>
          <Input isReadOnly value={platformUserName} />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ProfileConfig;
