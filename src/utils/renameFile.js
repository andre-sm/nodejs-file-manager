import { rename, access } from "fs/promises";
import { join, isAbsolute, dirname } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';

export const renameFile = async (filePath, newFileName) => {
    try {
        if (!filePath || !newFileName) {
            throw new Error('Invalid input');
        }

        const fullFilePath = isAbsolute(filePath) ? filePath : join(getCurrentDirectory(), filePath);
        await access(fullFilePath);
        
        const renamedFileFullPath = join(dirname(fullFilePath), newFileName);
        await rename(fullFilePath, renamedFileFullPath);
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
};