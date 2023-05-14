import { noop, uniqueId } from 'lodash';
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
} from 'react-icons/si';

import TypeScriptImage from './assets/dev-icons/typescript.svg';
import JavaScriptImage from './assets/dev-icons/javascript.svg';
import ReactImage from './assets/dev-icons/react.svg';
import HtmlImage from './assets/dev-icons/html5.svg';
import CssImage from './assets/dev-icons/css3.svg';
import GitImage from './assets/dev-icons/git.svg';
import GitHubImage from './assets/dev-icons/github.svg';

export const FONT_SIZES = [12, 14, 16, 18, 20];

export const CODE_SNIPPET = `// Define a Tuple Type to represent a user's name and commits
type UserContribution = [string, number];

// Create a new User Contribution Tuple
const userContribution: UserContribution = ["Sachin-chaurasiya", 3099];

// Attempt to assign a value of the wrong type to the Tuple
// This will result in a TypeScript error
userContribution[0] = 87; // Type 'number' is not assignable to type 'string'

// Define a function that returns a Tuple Type
function getUserContribution(): UserContribution {
  return ["Sachin-chaurasiya", 3099];
}

// Destructure the Tuple into individual variables
const [name, commits] = getUserContribution();
console.log(name); // "Sachin-chaurasiya"
console.log(commits); // 3099
`;

export const ROUTES = {
  HOME: '/',
  EDITOR: '/editor',
};

export const INITIAL_CONTEXT_DATA = {
  data: {
    language: 'javascript',
    theme: 'dracula',
    fontSize: 14,
  },
  onUpdate: noop,
};

export const CUSTOM_NODES = {
  EDITOR_NODE: 'editorNode',
  TEXT_NODE: 'textNode',
  IMAGE_NODE: 'imageNode',
};

export const INITIAL_NODES = [
  {
    id: uniqueId('dragged'),
    position: { x: 80, y: 50 },
    data: { label: 'Initial Code Editor Node' },
    type: 'editorNode',
  },
];

export const ICON_MAP = {
  js: SiJavascript,
  ts: SiTypescript,
  html: SiHtml5,
  css: SiCss3,
  tsx: SiReact,
  jsx: SiReact,
};
export const LANGUAGE_COLOR_MAP = {
  js: '#edc624',
  ts: '#2f76c4',
  jsx: '#61dafb',
  tsx: '#61dafb',
  html: '#f16528',
  css: '#3365f1',
};

export const DEV_IMAGES = {
  TYPESCRIPT: TypeScriptImage,
  JAVASCRIPT: JavaScriptImage,
  GIT: GitImage,
  GITHUB: GitHubImage,
  HTML: HtmlImage,
  CSS: CssImage,
  REACT: ReactImage,
};
