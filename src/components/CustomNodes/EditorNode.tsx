import React, { FC, memo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { Handle, NodeProps, Position } from 'reactflow';

const EditorNode: FC<NodeProps> = () => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
      <CodeEditor />
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

export default memo(EditorNode);
