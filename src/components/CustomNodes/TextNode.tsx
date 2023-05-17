import RichTextEditor from 'components/RichTextEditor/RichTextEditor';
import React, { FC } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const TextNode: FC<NodeProps> = ({ selected }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />

      <RichTextEditor />

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

export default TextNode;
