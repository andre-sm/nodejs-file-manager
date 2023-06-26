import { join } from 'path';
import { access } from 'fs/promises';
import { getCurrentDirectory, setCurrentDirectory, printCurrentDirectory } from './current-directory.js';

export const goToDirectory = async (path) => {
    try {
        if (!path) {
            throw new Error('Invalid input');
        } 
        const newDirectory = join(getCurrentDirectory(), path);
        await access(newDirectory);
        setCurrentDirectory(newDirectory);
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
}