import { DEFAULT_EDITOR_BG_COLOR, INITIAL_NODES } from './editor';
import SimpleGradientImage from 'assets/templates/simple-gradient.svg';
import SimpleGradientWithCodeEditorImage from 'assets/templates/simple-gradient-with-code-editor.svg';
import SimpleGradientWithDevIconImage from 'assets/templates/simple-gradient-dev-icon.svg';
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

export const SIMPLE_GRADIENT_WITH_DEV_ICON: Snippet = {
  background: 'linear-gradient(354deg, rgb(255, 117, 181), rgb(255, 184, 108))',
  hideWaterMark: false,
  profileInfo:
    '{"platform":"twitter","username":"sachindotcom","isVisible":true}',
  nodes:
    '[{"width":294,"height":115,"id":"92e95dcd-a25f-47a4-950d-e271dd3efd4c","position":{"x":141,"y":95},"data":{"code":"","fontSize":14,"language":"javascript","theme":"dracula","snippetName":""},"type":"editorNode","dragHandle":".node-drag-handle","positionAbsolute":{"x":141,"y":95},"selected":false,"dragging":false},{"width":300,"height":300,"id":"1de540c8-0b77-4c70-b56b-e0b3a9a09c8c","type":"imageNode","position":{"x":478,"y":198},"data":{"borderRadius":"4px","imageSource":"/static/media/javascript.702157f763aa08edb2d55978b5d19240.svg"},"selected":false,"dragging":false,"positionAbsolute":{"x":478,"y":198}}]',
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
  {
    name: 'simple-gradient-with-dev-icon',
    image: SimpleGradientWithDevIconImage,
    data: SIMPLE_GRADIENT_WITH_DEV_ICON,
  },
];
