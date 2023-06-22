import { rename, access } from "fs/promises";
import { join } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';

export const renameFile = async (filePath, newName) => {
    try {
        if (!filePath || !newName) {
            throw new Error('Invalid input');
        }
        const currentDirectory = getCurrentDirectory(); 
        const fileFullPath = join(currentDirectory, filePath);
        const renamedFileFullPath = join(currentDirectory, newName);

        await access(fileFullPath);
        await rename(fileFullPath, renamedFileFullPath);
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
};