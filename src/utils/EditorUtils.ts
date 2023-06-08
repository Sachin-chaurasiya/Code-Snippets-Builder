import { CUSTOM_NODES } from 'constants/editor';

export const getDragHandleByNodeType = (type: string) => {
  switch (type) {
    case CUSTOM_NODES.EDITOR_NODE:
      return '.node-drag-handle';
    case CUSTOM_NODES.TEXT_NODE:
      return '.custom_handle';

    default:
  }
};
