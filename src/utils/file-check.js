import { stat } from 'fs/promises';

export const fileCheck = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch (err) {
    console.error(err.message);
  }
};