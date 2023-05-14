import React, { FC } from 'react';
import AddMediaModal from '../AddMediaModal/AddMediaModal';
import { Handle, NodeProps, Position } from 'reactflow';

const ImageNode: FC<NodeProps> = ({ selected }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
      <AddMediaModal />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555', opacity: 0 }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={false}
      />
      ;
    </>
  );
};

export default ImageNode;
