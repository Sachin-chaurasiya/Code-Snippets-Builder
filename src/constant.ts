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
export const BORDER_RADIUS = [4, 6, 8, 10, 12];

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
  editor: {
    language: 'javascript',
    theme: 'dracula',
    fontSize: 14,
  },
  text: {
    background: 'transparent',
    color: 'currentColor',
    fontSize: 16,
    borderRadius: '4px',
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

export const TEXT_COLORS = [
  'gray.500',
  'red.500',
  'gray.700',
  'green.500',
  'blue.500',
  'blue.800',
  'yellow.500',
  'orange.500',
  'purple.500',
  'pink.500',
];

export const GRADIENT_COLORS = [
  'linear-gradient(337deg, rgb(101, 78, 163), rgb(218, 152, 180))',
  'linear-gradient(354deg, rgb(255, 117, 181), rgb(255, 184, 108))',
  'linear-gradient(355deg, rgb(28, 94, 101), rgb(83, 197, 148))',
  'linear-gradient(55deg, rgb(138, 35, 135), rgb(233, 64, 87), rgb(233, 64, 87))',
  'linear-gradient(270deg, rgb(20, 30, 48), rgb(36, 59, 85))',
  'linear-gradient(120deg, rgb(212, 252, 121), rgb(150, 230, 161))',
  'linear-gradient(120deg, rgb(246, 211, 101), rgb(253, 160, 133))',
  'linear-gradient(120deg, rgb(132, 250, 176), rgb(143, 211, 244))',
  'linear-gradient(120deg, rgb(252, 203, 144), rgb(213, 126, 235))',
  'linear-gradient(145deg, rgb(48, 207, 208), rgb(51, 8, 103))',
  'linear-gradient(0deg, rgb(210, 153, 194), rgb(254, 249, 215))',
  'linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))',
  'linear-gradient(90deg, rgb(247, 140, 160), rgb(249, 116, 143), rgb(253, 134, 140), rgb(254, 154, 139))',
  'linear-gradient(0deg, rgb(172, 203, 238), rgb(231, 240, 253))',
  'linear-gradient(0deg, rgb(193, 223, 196), rgb(222, 236, 221))',
  'linear-gradient(0deg, rgb(106, 133, 182), rgb(186, 200, 224))',
  'linear-gradient(0deg, rgb(151, 149, 240), rgb(251, 200, 212))',
  'linear-gradient(320deg, rgb(63, 81, 177), rgb(143, 106, 174), rgb(204, 107, 142), rgb(241, 130, 113), rgb(243, 164, 105), rgb(247, 201, 120))',
  'linear-gradient(0deg, rgb(199, 29, 111), rgb(208, 150, 147))',
  'linear-gradient(90deg, rgb(168, 202, 186), rgb(93, 65, 87))',
  'linear-gradient(0deg, rgb(59, 65, 197), rgb(169, 129, 187), rgb(255, 200, 169))',
  'linear-gradient(0deg, rgb(230, 185, 128), rgb(234, 205, 163))',
  'linear-gradient(0deg, rgb(30, 60, 114), rgb(30, 60, 114), rgb(42, 82, 152))',
  'linear-gradient(45deg, rgb(255, 199, 150), rgb(255, 107, 149))',
  'linear-gradient(45deg, rgb(0, 219, 222), rgb(252, 0, 255))',
  'linear-gradient(0deg, rgb(80, 204, 127), rgb(245, 209, 0))',
  'linear-gradient(90deg, rgb(10, 207, 254), rgb(73, 90, 255))',
  'linear-gradient(45deg, rgb(225, 79, 173), rgb(249, 212, 35))',
  'linear-gradient(45deg, rgb(236, 119, 171), rgb(120, 115, 245))',
  'linear-gradient(0deg, rgb(255, 154, 158), rgb(254, 207, 239), rgb(254, 207, 239))',
  'linear-gradient(0deg, rgb(199, 144, 129), rgb(223, 165, 121))',
  'linear-gradient(225deg, rgb(105, 234, 203), rgb(234, 204, 248), rgb(102, 84, 241))',
  'linear-gradient(0deg, rgb(2, 80, 197), rgb(212, 63, 141))',
  'linear-gradient(0deg, rgb(255, 8, 68), rgb(255, 177, 153))',
  'linear-gradient(225deg, rgb(252, 235, 194), rgb(253, 103, 166), rgb(178, 152, 250))',
];

export const FONTS = ['cursive', 'fantasy', 'monospace', 'sans-serif', 'serif'];

export const NAMED_COLORS = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'white',
  'transparent',
];
