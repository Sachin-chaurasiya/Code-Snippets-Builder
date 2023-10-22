import { Client, Databases, Query, Users } from 'node-appwrite';

class AppwriteService {
  constructor() {
    const client = new Client();
    client
      .setEndpoint(process.env.REACT_APP_ENDPOINT)
      .setProject(process.env.REACT_APP_PROJECT_ID)
      .setKey(process.env.REACT_APP_API_KEY);

    this.databases = new Databases(client);
    this.users = new Users(client);
  }

  async getUsersCount() {
    try {
      const document = await this.users.list([Query.limit(1)]);
      return document.total;
    } catch (error) {
      // handle error
      return 0;
    }
  }

  async getDocumentCount() {
    try {
      const document = await this.databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        [Query.limit(1)]
      );
      return document.total;
    } catch (error) {
      // handle error
      return 0;
    }
  }
}

export const appwriteService = new AppwriteService();
