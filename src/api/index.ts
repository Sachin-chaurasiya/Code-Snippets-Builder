import { Account, Avatars, Client, Databases } from 'appwrite';
import { FAILURE_REDIRECT_URL, SUCCESS_REDIRECT_URL } from 'constants/links';
import { AuthProvider } from 'interfaces/Auth.interface';
import { Server } from 'utils/Config';
import { v4 as generateUniqueId } from 'uuid';

const initClient = () => {
  const client = new Client()
    .setEndpoint(Server.endpoint as string)
    .setProject(Server.project as string);

  const database = new Databases(client);
  const account = new Account(client);
  const avatar = new Avatars(client);

  return { database, account, client, avatar };
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
   *
   * @param name user name
   * @returns avatar url
   */
  getAvatar: (name?: string) => {
    return API_CLIENT.avatar.getInitials(name);
  },

  /**
   * Create the session for google auth provider
   */
  googleSignIn: () => {
    API_CLIENT.account.createOAuth2Session(
      AuthProvider.GOOGLE,
      SUCCESS_REDIRECT_URL,
      FAILURE_REDIRECT_URL
    );
  },

  /**
   * Create the session for github auth provider
   */
  githubSignIn: () => {
    API_CLIENT.account.createOAuth2Session(
      AuthProvider.GITHUB,
      SUCCESS_REDIRECT_URL,
      FAILURE_REDIRECT_URL
    );
  },

  /**
   *
   * @param email user email
   * @param password user password
   * @returns created user data
   */
  emailSignUp: async (email: string, password: string) => {
    const data = await API_CLIENT.account.create(
      generateUniqueId(),
      email,
      password
    );

    return data;
  },

  /**
   *
   * @param email user email
   * @param password user password
   * @returns logged in user data
   */
  emailSignIn: async (email: string, password: string) => {
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
