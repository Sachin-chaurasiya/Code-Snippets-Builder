import { CUSTOM_NODES } from 'constants/editor';
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
