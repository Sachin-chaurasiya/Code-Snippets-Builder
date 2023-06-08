import React, { Fragment } from 'react';
import { Panel } from 'reactflow';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { useAppProvider } from 'AppProvider';

const ProfilePanel = () => {
  const { profile } = useAppProvider();

  return (
    <Fragment>
      {profile.isVisible ? (
        <Panel position="bottom-left">
          <ProfileInfo />
        </Panel>
      ) : null}
    </Fragment>
  );
};

export default ProfilePanel;
