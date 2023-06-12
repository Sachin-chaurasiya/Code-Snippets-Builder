import React, { FC, memo, useEffect, useState } from 'react';
import AddMediaModal from '../../Modals/AddMediaModal/AddMediaModal';
import { NodeProps, NodeResizer } from 'reactflow';
import { Image } from '@chakra-ui/react';
import { HANDLE_COLOR } from 'constants/editor';
import { NodeData } from 'interfaces/Editor.interface';

const ImageNode: FC<NodeProps<NodeData>> = ({ selected, id, data }) => {
  const { imageSource = '', onUpdate, borderRadius } = data;

  const [source, setSource] = useState<string>(imageSource);

  const handleUpdate = (imageSource: string) => {
    if (onUpdate) {
      onUpdate(id, { imageSource });
    }
  };

  useEffect(() => {
    handleUpdate(source);
  }, [source]);

  return (
    <>
      {source ? (
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
      ) : null}

      {source ? (
        <Image width="100%" src={source} borderRadius={borderRadius} />
      ) : (
        <AddMediaModal onSourceSelect={setSource} />
      )}
    </>
  );
};

export default memo(ImageNode);
