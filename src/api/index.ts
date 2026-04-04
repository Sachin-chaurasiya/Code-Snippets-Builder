import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Storage,
} from 'appwrite';
import { FAILURE_REDIRECT_URL, SUCCESS_REDIRECT_URL } from 'constants/links';
import { Server } from 'utils/Config';
import { v4 as generateUniqueId } from 'uuid';

const initClient = () => {
  const client = new Client()
    .setEndpoint(Server.endpoint)
    .setProject(Server.project);

  const database = new Databases(client);
  const account = new Account(client);
  const avatar = new Avatars(client);
  const storage = new Storage(client);

  return { database, account, client, avatar, storage };
};

export const API_CLIENT = {
  ...initClient(),

  getLoggedInUserSession: async () => {
    const session = await API_CLIENT.account.getSession('current');

    return session;
  },

  getLoggedInUser: async () => {
    const user = await API_CLIENT.account.get();

    return user;
  },

  getAvatar: (name?: string) => {
    return API_CLIENT.avatar.getInitials(name);
  },

  googleSignIn: () => {
    API_CLIENT.account.createOAuth2Session(
      OAuthProvider.Google,
      SUCCESS_REDIRECT_URL,
      FAILURE_REDIRECT_URL
    );
  },

  githubSignIn: () => {
    API_CLIENT.account.createOAuth2Session(
      OAuthProvider.Github,
      SUCCESS_REDIRECT_URL,
      FAILURE_REDIRECT_URL
    );
  },

  emailSignUp: async (email: string, password: string) => {
    const data = await API_CLIENT.account.create(
      generateUniqueId(),
      email,
      password
    );

    return data;
  },

  emailSignIn: async (email: string, password: string) => {
    const session = await API_CLIENT.account.createEmailPasswordSession(
      email,
      password
    );

    return session;
  },

  logout: async () => {
    return await API_CLIENT.account.deleteSession('current');
  },
};
