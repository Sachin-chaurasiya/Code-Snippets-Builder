import { INITIAL_CONTEXT_DATA } from 'constants/common';
import { CUSTOM_NODES } from 'constants/editor';
import { NodeDataStore } from 'interfaces/Editor.interface';
import { v4 as generateUniqueId } from 'uuid';

export const getDragHandleByNodeType = (type: string) => {
  switch (type) {
    case CUSTOM_NODES.EDITOR_NODE:
      return '.node-drag-handle';
    case CUSTOM_NODES.TEXT_NODE:
      return '.custom_handle';

    default:
  }
};

export const getUniqueId = () => generateUniqueId();

export const getInitialNodeDataByType = (type: string): NodeDataStore => {
  switch (type) {
    case CUSTOM_NODES.EDITOR_NODE:
      return {
        code: '',
        fontSize: INITIAL_CONTEXT_DATA.editor.fontSize,
        language: INITIAL_CONTEXT_DATA.editor.language,
        theme: INITIAL_CONTEXT_DATA.editor.theme,
        snippetName: '',
      };
    case CUSTOM_NODES.IMAGE_NODE:
      return {
        borderRadius: INITIAL_CONTEXT_DATA.image.borderRadius,
        imageSource: '',
      };
    case CUSTOM_NODES.TEXT_NODE:
      return {
        text: '',
        fontSize: INITIAL_CONTEXT_DATA.text.fontSize,
        background: INITIAL_CONTEXT_DATA.text.background,
        borderRadius: INITIAL_CONTEXT_DATA.text.borderRadius,
      };

    default:
      return {};
  }
};
