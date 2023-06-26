import { join } from 'path';
import { access } from 'fs/promises';
import { printCurrentDirectory, getCurrentDirectory, setCurrentDirectory } from './current-directory.js';

export const moveUP = async () => {
    try {
        const newDirectory = join(getCurrentDirectory(), '../');
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