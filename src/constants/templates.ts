import { DEFAULT_EDITOR_BG_COLOR, INITIAL_NODES } from './editor';
import SimpleGradientImage from 'assets/templates/simple-gradient.svg';
import SimpleGradientWithCodeEditorImage from 'assets/templates/simple-gradient-with-code-editor.svg';
import { Snippet } from 'interfaces/AppProvider.interface';
import { getStringifiedValue } from 'utils/EditorUtils';

export const SIMPLE_GRADIENT: Snippet = {
  background: DEFAULT_EDITOR_BG_COLOR,
  hideWaterMark: true,
  profileInfo: getStringifiedValue({
    platform: 'twitter',
    username: '',
    isVisible: false,
  }),
  nodes: getStringifiedValue([]),
  creator: '',
  snapshot: '',
};

export const DEFAULT_TEMPLATE: Snippet = {
  background: DEFAULT_EDITOR_BG_COLOR,
  hideWaterMark: false,
  profileInfo: getStringifiedValue({
    platform: 'twitter',
    username: '',
    isVisible: true,
  }),
  nodes: getStringifiedValue([]),
  creator: '',
  snapshot: '',
};

export const SIMPLE_GRADIENT_WITH_CODE_EDITOR: Snippet = {
  background: 'linear-gradient(354deg, rgb(255, 117, 181), rgb(255, 184, 108))',
  hideWaterMark: false,
  profileInfo: getStringifiedValue({
    platform: 'twitter',
    username: '',
    isVisible: true,
  }),
  nodes: getStringifiedValue(INITIAL_NODES),
  creator: '',
  snapshot: '',
};

export const TEMPLATES = [
  {
    name: 'simple-gradient',
    image: SimpleGradientImage,
    data: SIMPLE_GRADIENT,
  },
  {
    name: 'simple-gradient-with-code-editor',
    image: SimpleGradientWithCodeEditorImage,
    data: SIMPLE_GRADIENT_WITH_CODE_EDITOR,
  },
];
