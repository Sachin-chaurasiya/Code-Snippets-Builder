import { Account, Client, Databases } from 'appwrite';
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
  /**
   *
   * @returns current logged in user session
   */
  getLoggedInUserSession: async () => {
    const session = await API_CLIENT.account.getSession('current');

    return session;
  },

  /**
   *
   * @returns current logged in user data
   */
  getLoggedInUser: async () => {
    const user = await API_CLIENT.account.get();

    return user;
  },

  /**
   * Create the session for google auth provider
   */
  googleLogin: () => {
    API_CLIENT.account.createOAuth2Session(
      'google',
      `${window.location.origin}/profile`,
      `${window.location.origin}/login`
    );
  },

  /**
   * Create the session for github auth provider
   */
  githubLogin: () => {
    API_CLIENT.account.createOAuth2Session(
      'github',
      `${window.location.origin}/profile`,
      `${window.location.origin}/login`
    );
  },

  /**
   *
   * @param email user email
   * @param password user password
   * @param name user name(Optional)
   * @returns created user data
   */
  emailSignUp: async (email: string, password: string, name?: string) => {
    const data = await API_CLIENT.account.create(
      generateUniqueId(),
      email,
      password,
      name
    );

    return data;
  },

  /**
   *
   * @param email user email
   * @param password user password
   * @param _ user name(Optional)
   * @returns logged in user data
   */
  emailLogin: async (email: string, password: string, _?: string) => {
    const session = await API_CLIENT.account.createEmailSession(
      email,
      password
    );

    return session;
  },

  /**
   *
   * @returns Logged out the current user
   */
  logout: async () => {
    return await API_CLIENT.account.deleteSession('current');
  },
};
