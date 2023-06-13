import CustomHandle from 'components/Common/CustomHandle/CustomHandle';
import RichTextEditor from 'components/Editor/RichTextEditor/RichTextEditor';
import {
  HANDLE_BOTTOM_STYLE,
  HANDLE_LEFT_STYLE,
  HANDLE_RIGHT_STYLE,
  HANDLE_STYLE_X,
  HANDLE_STYLE_Y,
  HANDLE_TOP_STYLE,
  INITIAL_CONTEXT_DATA,
} from 'constants/common';
import { HANDLE_COLOR } from 'constants/editor';
import { NodeData } from 'interfaces/Editor.interface';
import React, { FC, memo, useState } from 'react';
import { NodeProps, NodeResizer, ResizeParams } from 'reactflow';

const TextNode: FC<NodeProps<NodeData>> = ({ selected, id, data }) => {
  const {
    text = '',
    onUpdate,
    fontSize = INITIAL_CONTEXT_DATA.text.fontSize,
    background = INITIAL_CONTEXT_DATA.text.background,
    borderRadius = INITIAL_CONTEXT_DATA.text.borderRadius,
  } = data;

  const [params, setParams] = useState<ResizeParams>();

  const handleUpdate = (updatedText: string) => {
    if (onUpdate) {
      onUpdate(id, { text: updatedText });
    }
  };

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
        onResizeEnd={(_, param) => {
          setParams(param);
        }}
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
        onUpdate={handleUpdate}
        text={text}
        width={params?.width ?? 300}
        height={params?.height ?? 60}
        background={background}
        borderRadius={borderRadius}
        fontSize={fontSize}
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
