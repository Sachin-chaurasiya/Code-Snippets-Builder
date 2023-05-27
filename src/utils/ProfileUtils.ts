import { SUPPORTED_PROFILES } from 'constants/profile';

export const getProfileInfoByPlatform = (platform: string) => {
  return SUPPORTED_PROFILES.find((s) => s.value === platform);
};
