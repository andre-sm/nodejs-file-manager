import { rename, access } from 'fs/promises';
import { join, isAbsolute, dirname } from 'path';
import * as directoryCommands from '../directory/index.js';

export const renameFile = async (filePath, newFileName) => {
    try {
        if (!filePath || !newFileName) {
            throw new Error('Invalid input');
        }

        const fullFilePath = isAbsolute(filePath) ? filePath : join(directoryCommands.getCurrentDirectory(), filePath);
        await access(fullFilePath);
        
        const renamedFileFullPath = join(dirname(fullFilePath), newFileName);
        await rename(fullFilePath, renamedFileFullPath);
        console.log('File was renamed!');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    } finally {
        directoryCommands.printCurrentDirectory();
    }
};