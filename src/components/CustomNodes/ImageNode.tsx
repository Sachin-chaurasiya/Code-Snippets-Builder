import React, { FC, memo, useState } from 'react';
import AddMediaModal from '../AddMediaModal/AddMediaModal';
import { NodeProps, NodeResizer } from 'reactflow';
import { Image } from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { HANDLE_COLOR } from 'constants/editor';

const ImageNode: FC<NodeProps> = ({ selected }) => {
  const { image } = useAppProvider();
  const [source, setSource] = useState<string>('');

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
        <Image width="100%" src={source} borderRadius={image.borderRadius} />
      ) : (
        <AddMediaModal onSourceSelect={setSource} />
      )}
    </>
  );
};

export default memo(ImageNode);
