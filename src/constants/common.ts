import { noop } from 'lodash';

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
    background: 'moccasin',
    color: 'currentColor',
    fontSize: 16,
    borderRadius: '4px',
  },
  image: {
    borderRadius: '4px',
  },
  onUpdate: noop,
};
