import { INITIAL_CONTEXT_DATA } from 'constants/common';
import { CUSTOM_NODES } from 'constants/editor';
import { toPng } from 'html-to-image';
import { Snippet, SnippetData } from 'interfaces/AppProvider.interface';
import { NodeDataStore } from 'interfaces/Editor.interface';
import { cloneDeep, isEqual } from 'lodash';
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

export const getStringifiedValue = (data: unknown) => {
  return JSON.stringify(data);
};

export const getParsedValue = (data: string) => {
  return JSON.parse(data);
};

export const getSnippetSnapshot = async () => {
  const node = document.querySelector('.react-flow');
  if (node) {
    try {
      const imageBase64Url = await toPng(node as HTMLElement, {
        filter: (node) => {
          // we don't want to add the minimap and the controls to the image
          if (
            node?.classList?.contains('react-flow__minimap') ||
            node?.classList?.contains('react-flow__controls')
          ) {
            return false;
          }

          return true;
        },
        quality: 1,
      });

      return imageBase64Url;
    } catch (error) {
      return '';
    }
  }

  return '';
};

export const isAllowedToUpdate = (
  snippetData: SnippetData,
  updatedData: Partial<Snippet>
) => {
  const clonedSnippetData = cloneDeep(snippetData);
  const updatedSnippetData = { ...clonedSnippetData, ...updatedData };
  return !isEqual(clonedSnippetData, updatedSnippetData);
};
