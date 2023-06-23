import { access, unlink } from "fs/promises";
import { join, isAbsolute } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';

export const deleteFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        } 

        const currentDirectory = getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);

        await access(fullFilePath);
        await unlink(fullFilePath);
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
};