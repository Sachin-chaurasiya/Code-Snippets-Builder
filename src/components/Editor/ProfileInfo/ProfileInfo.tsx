import { Flex, Icon, Text } from '@chakra-ui/react';
import { ProfileData } from 'interfaces/AppProvider.interface';
import React, { useMemo } from 'react';
import { getProfileInfoByPlatform } from 'utils/ProfileUtils';

const ProfileInfo = ({ profile }: { profile: ProfileData }) => {
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
      <Text color="white">
        {profile.platform === 'twitter' ? '@' : ''}
        {profile.username}
      </Text>
    </Flex>
  );
};

export default ProfileInfo;
