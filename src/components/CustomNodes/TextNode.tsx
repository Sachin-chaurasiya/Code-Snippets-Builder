import RichTextEditor from 'components/RichTextEditor/RichTextEditor';
import {
  HANDLE_BOTTOM_STYLE,
  HANDLE_LEFT_STYLE,
  HANDLE_RIGHT_STYLE,
  HANDLE_STYLE_X,
  HANDLE_STYLE_Y,
  HANDLE_TOP_STYLE,
} from 'constants/common';
import { HANDLE_COLOR } from 'constants/editor';
import React, { FC, memo, useEffect, useState } from 'react';
import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  ResizeParams,
} from 'reactflow';

const TextNode: FC<NodeProps> = ({ selected }) => {
  const [params, setParams] = useState<ResizeParams>();

  useEffect(() => {
    const collection = document.getElementsByClassName('react-flow__handle');
    const list = Array.from(collection);
    list.forEach((item) =>
      item.classList.remove(
        ...['nodrag', 'nopan', 'target', 'connectablestart', 'connectableend']
      )
    );
  }, []);

  return (
    <>
      <NodeResizer
        handleStyle={{
          borderRadius: '50%',
          width: '8px',
          height: '8px',
          color: HANDLE_COLOR,
        }}
        minWidth={200}
        minHeight={60}
        color={HANDLE_COLOR}
        keepAspectRatio
        isVisible={selected}
        onResizeEnd={(_, param) => setParams(param)}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ ...HANDLE_STYLE_X, ...HANDLE_LEFT_STYLE }}
        isConnectable={false}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ ...HANDLE_STYLE_Y, ...HANDLE_TOP_STYLE }}
        isConnectable={false}
      />

      <RichTextEditor
        width={params?.width ?? 300}
        height={params?.height ?? 60}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{ ...HANDLE_STYLE_X, ...HANDLE_RIGHT_STYLE }}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ ...HANDLE_STYLE_Y, ...HANDLE_BOTTOM_STYLE }}
        isConnectable={false}
      />
    </>
  );
};

export default memo(TextNode);
