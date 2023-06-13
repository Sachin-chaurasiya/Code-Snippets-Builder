import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import React, { Fragment } from 'react';
import { Panel } from 'reactflow';

const WatermarkPanel = ({ hideWaterMark }: { hideWaterMark: boolean }) => {
  return (
    <Fragment>
      {!hideWaterMark ? (
        <Panel position="bottom-right">
          <BrandLogo
            gap={4}
            h="auto"
            textColor="white"
            logoType="light"
            textBackgroundColor="transparent"
            backgroundClip="inherit"
            logoSize="x-small"
            textFontSize="md"
            textFontWeight="normal"
          />
        </Panel>
      ) : null}
    </Fragment>
  );
};

export default WatermarkPanel;
