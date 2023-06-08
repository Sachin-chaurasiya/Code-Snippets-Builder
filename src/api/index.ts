import { Account, Client, Databases } from 'appwrite';
import { ROUTES } from 'constants/common';
import { Server } from 'utils/Config';
import { v4 as generateUniqueId } from 'uuid';

const initClient = () => {
  const client = new Client()
    .setEndpoint(Server.endpoint as string)
    .setProject(Server.project as string);

  const database = new Databases(client);
  const account = new Account(client);

  return { database, account };
};

export const API_CLIENT = {
  ...initClient(),
  getLoggedInUserSession: async () => {
    try {
      const session = await API_CLIENT.account.getSession('current');

      return session;
    } catch (error) {
      return undefined;
    }
  },
  googleLogin: () => {
    API_CLIENT.account.createOAuth2Session(
      'google',
      `${window.location.origin}/profile`,
      `${window.location.origin}/login`
    );
  },
  githubLogin: () => {
    API_CLIENT.account.createOAuth2Session(
      'github',
      `${window.location.origin}/profile`,
      `${window.location.origin}/login`
    );
  },
  emailLogin: async (email: string, password: string, name?: string) => {
    try {
      const user = await API_CLIENT.account.create(
        generateUniqueId(),
        email,
        password,
        name
      );

      return user;
    } catch (error) {
      // handle error

      return undefined;
    }
  },
  logout: async () => {
    try {
      await API_CLIENT.account.deleteSession('current');
      window.location.href = ROUTES.LOGIN;
    } catch (error) {
      // handle error
    }
  },
};
