import React, { Fragment } from 'react';
import { Panel } from 'reactflow';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { ProfileData } from 'interfaces/AppProvider.interface';

const ProfilePanel = ({ profile }: { profile: ProfileData }) => {
  return (
    <Fragment>
      {profile.isVisible ? (
        <Panel position="bottom-left">
          <ProfileInfo profile={profile} />
        </Panel>
      ) : null}
    </Fragment>
  );
};

export default ProfilePanel;
