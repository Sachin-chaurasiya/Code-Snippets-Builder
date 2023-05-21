import { LANGUAGE_COLOR_MAP } from 'constants/editor';
import { ICON_MAP } from 'constants/icon';

export const getIconByFileExtension = (extension: string) =>
  ICON_MAP[extension as keyof typeof ICON_MAP];

export const getIconColorByFileExtension = (extension: string) =>
  LANGUAGE_COLOR_MAP[extension as keyof typeof LANGUAGE_COLOR_MAP];
