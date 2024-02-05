import { stat } from 'fs/promises';

export const directoryCheck = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (err) {
    console.error(err.message);
  }
};