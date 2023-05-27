import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

export const SUPPORTED_PROFILES = [
  {
    label: 'LinkedIn',
    icon: BsLinkedin,
    value: 'linkedin',
    brandColor: '#0a66c2',
  },
  { label: 'GitHub', icon: BsGithub, value: 'github', brandColor: '#171515' },
  {
    label: 'Twitter',
    icon: BsTwitter,
    value: 'twitter',
    brandColor: '#1fa1f1',
  },
];
