import { ICON_MAP, LANGUAGE_COLOR_MAP } from '../constants';

export const getIconByFileExtension = (extension: string) =>
  ICON_MAP[extension as keyof typeof ICON_MAP];

export const getIconColorByFileExtension = (extension: string) =>
  LANGUAGE_COLOR_MAP[extension as keyof typeof LANGUAGE_COLOR_MAP];
