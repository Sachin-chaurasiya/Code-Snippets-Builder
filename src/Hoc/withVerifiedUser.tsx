import { useAppProvider } from 'AppProvider';
import EmailVerification from 'components/Common/EmailVerification';
import Loader from 'components/Common/Loader/Loader';
import React from 'react';

// higher order component that wraps a component and checks if the user is verified

// if the user is not verified, it will show the user a message to verify their email

// if the user is verified, it will show the component that was passed in

export const withVerifiedUser = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const VerifiedUserComponent = (props: any) => {
    const { loggedInUser, isFetchingUser } = useAppProvider();
    if (isFetchingUser) {
      return <Loader />;
    }
    if (!loggedInUser?.emailVerification) {
      return <EmailVerification email={loggedInUser?.email ?? ''} />;
    }
    return <Component {...props} />;
  };

  return VerifiedUserComponent;
};
