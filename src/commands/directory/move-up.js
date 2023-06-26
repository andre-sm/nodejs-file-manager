import { join } from 'path';
import { access } from 'fs/promises';
import * as directoryCommands from './index.js';

export const moveUP = async () => {
    try {
        const newDirectory = join(directoryCommands.getCurrentDirectory(), '../');
        await access(newDirectory);
        directoryCommands.setCurrentDirectory(newDirectory);
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