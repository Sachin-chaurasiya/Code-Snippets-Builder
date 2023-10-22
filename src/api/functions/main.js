import { appwriteService } from './appwrite.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async ({ res, req, log, error: errorCallback }) => {
  try {
    const usersCount = await appwriteService.getUsersCount();
    log('Fetching users count');
    const documentCount = await appwriteService.getDocumentCount();
    log('Fetching documents count');
    log('Fetching done!');
    return res.json({ usersCount, documentCount }, 200);
  } catch (error) {
    errorCallback(error.message);
    return res.json(
      { message: 'Something went wrong', error: error.message },
      500
    );
  }
};
