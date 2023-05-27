import { noop } from 'lodash';
import { CSSProperties } from 'react';

export const ROUTES = {
  HOME: '/',
  EDITOR: '/editor',
};

export const INITIAL_CONTEXT_DATA = {
  editor: {
    language: 'javascript',
    theme: 'dracula',
    fontSize: 14,
  },
  text: {
    background: 'white',
    color: 'currentColor',
    fontSize: 16,
    borderRadius: '4px',
  },
  image: {
    borderRadius: '4px',
  },
  profile: {
    platform: 'twitter',
    username: 'sachindotcom',
  },
  onUpdate: noop,
};

export const HANDLE_STYLE_X: CSSProperties = {
  background: 'transparent',
  opacity: 0,
  minHeight: '100%',
  pointerEvents: 'all',
};
export const HANDLE_STYLE_Y: CSSProperties = {
  background: 'transparent',
  opacity: 0,
  minWidth: '100%',
  pointerEvents: 'all',
};

export const HANDLE_LEFT_STYLE: CSSProperties = {
  left: '-8px',
  width: '16px',
};
export const HANDLE_RIGHT_STYLE: CSSProperties = {
  right: '-8px',
  width: '16px',
};
export const HANDLE_TOP_STYLE: CSSProperties = {
  top: '-8px',
  height: '16px',
};
export const HANDLE_BOTTOM_STYLE: CSSProperties = {
  bottom: '-8px',
  height: '16px',
};

export const BORDER_RADIUS_MEDIUM = '4px';
export const BORDER_RADIUS_LARGE = '6px';
