import { Account, Client, Databases } from 'appwrite';
import { Server } from 'utils/Config';

const initClient = () => {
  const client = new Client()
    .setEndpoint(Server.endpoint as string)
    .setProject(Server.project as string);

  const database = new Databases(client);
  const account = new Account(client);

  return { database, account };
};

export const API_CLIENT = initClient();
