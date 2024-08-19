import { CSSProperties } from 'react';

export const ROUTES = {
  HOME: '/',
  EDITOR: '/editor',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  PROFILE: '/profile',
  CALLBACK: '/callback',
  DASHBOARD: '/dashboard',
  TEMPLATES: '/templates',
  EMAIL_VERIFICATION: '/email-verification',
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
    username: '',
    isVisible: true,
  },
  hideWaterMark: false,
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
export const APP_TEXT_COLOR = '#2d3748';
export const PRIMARY_GRADIENT_COLOR =
  'linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))';
export const PRIMARY_COLOR = '#715BB9';

export const SESSION_KEY = 'code_snippet_builder_session';

export const DATABASE_ID = 'CodeSnippetBuilder';
export const COLLECTION_ID = 'snippet_entity';
export const FOLDER_COLLECTION_ID = 'folder_entity';
export const BUCKET_ID = 'snippet_images';

export const PAGE_SIZE = 12;

export const BRAND_BORDER_RADIUS = '150px';

export const BRAND_COLOR = '#5E71E4';

export const STATS = [
  {
    description: 'Snippets Created',
    value: 1500,
  },
  {
    description: 'Snippets Shared',
    value: 1100,
  },
  {
    description: 'Users Registered',
    value: 800,
  },
  {
    description: 'Templates',
    value: 3,
  },
];

export const MOBILE_SUPPORTED_PAGES = [
  ROUTES.HOME,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.CALLBACK,
];
