import { join, isAbsolute } from 'path';
import { access } from 'fs/promises';
import * as directoryCommands from './index.js';

export const goToDirectory = async (path) => {
    try {
        if (!path) {
            throw new Error('Invalid input');
        }
        const currentDirectory = directoryCommands.getCurrentDirectory(); 
        const fullDirectoryPath = isAbsolute(path) ? path : join(currentDirectory, path);
        await access(fullDirectoryPath);
        directoryCommands.setCurrentDirectory(fullDirectoryPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    } finally {
        directoryCommands.printCurrentDirectory();
    }
}