import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { HANDLE_COLOR } from 'constant';
import React, { FC, memo } from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

const TextNode: FC<NodeProps> = ({ selected }) => {
  const { text } = useAppProvider();

  return (
    <>
      <NodeResizer
        handleStyle={{
          borderRadius: '50%',
          width: '8px',
          height: '8px',
          color: HANDLE_COLOR,
        }}
        color={HANDLE_COLOR}
        keepAspectRatio
        isVisible={selected}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />

      <Editable
        autoFocus
        bg={text.background}
        placeholder="Type something..."
        height="inherit"
        width="inherit"
        px="8px"
        fontSize={text.fontSize}
        borderRadius={text.borderRadius}
      >
        <EditablePreview />
        <EditableTextarea
          autoFocus
          _focusVisible={{ outline: 'none' }}
          resize="none"
        />
      </Editable>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
    </>
  );
};

export default memo(TextNode);
