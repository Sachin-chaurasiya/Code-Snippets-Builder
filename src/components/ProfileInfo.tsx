import { Flex, Icon, Text } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import React, { useMemo } from 'react';
import { getProfileInfoByPlatform } from 'utils/ProfileUtils';

const ProfileInfo = () => {
  const { profile } = useAppProvider();

  const profileInfo = useMemo(
    () => getProfileInfoByPlatform(profile.platform),
    [profile]
  );

  return (
    <Flex alignItems="center" gap={2} marginBottom="8px">
      <Icon
        boxSize="24px"
        as={profileInfo?.icon}
        color={profileInfo?.brandColor}
      />
      <Text color="white">{profile.username}</Text>
    </Flex>
  );
};

export default ProfileInfo;
