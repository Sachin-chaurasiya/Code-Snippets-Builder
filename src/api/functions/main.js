import { appwriteService } from './appwrite.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async ({ res, _req, log, error: errorCallback }) => {
  try {
    log('Fetching users count');
    const usersCount = await appwriteService.getUsersCount();
    log('Fetching done!');
    return res.json({ usersCount }, 200);
  } catch (error) {
    errorCallback(error.message);
    return res.json(
      { message: 'Something went wrong', error: error.message },
      500
    );
  }
};
