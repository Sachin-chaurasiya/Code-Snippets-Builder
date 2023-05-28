import CustomHandle from 'components/CustomHandle/CustomHandle';
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
import React, { FC, memo, useState } from 'react';
import { NodeProps, NodeResizer, ResizeParams } from 'reactflow';

const TextNode: FC<NodeProps> = ({ selected, dragging }) => {
  const [params, setParams] = useState<ResizeParams>();

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
      <CustomHandle
        top="50%"
        transform="translate(0, -50%)"
        style={{ ...HANDLE_STYLE_X, ...HANDLE_LEFT_STYLE }}
      />
      <CustomHandle
        left="50%"
        transform="translate(-50%, 0)"
        style={{ ...HANDLE_STYLE_Y, ...HANDLE_TOP_STYLE }}
      />

      <RichTextEditor
        width={params?.width ?? 300}
        height={params?.height ?? 60}
      />
      <CustomHandle
        top="50%"
        transform="translate(0, -50%)"
        style={{ ...HANDLE_STYLE_X, ...HANDLE_RIGHT_STYLE }}
      />

      <CustomHandle
        top="auto"
        left="50%"
        transform="translate(-50%, 0)"
        style={{ ...HANDLE_STYLE_Y, ...HANDLE_BOTTOM_STYLE }}
      />
    </>
  );
};

export default memo(TextNode);
