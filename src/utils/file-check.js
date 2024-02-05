import { stat } from 'fs/promises';

export const fileCheck = async (path) => {
    try {
        const stats = await stat(path);
        return stats.isFile();
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            console.error(err.message);
        }
    }
};
