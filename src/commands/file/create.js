import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as directoryCommands from '../directory/index.js';

export const createFile = async (fileName) => {
    try {
        if (!fileName) {
            throw new Error('Invalid input');
        } 
        const fullFilePath = join(directoryCommands.getCurrentDirectory(), fileName);
        await writeFile(fullFilePath, '');
        directoryCommands.printCurrentDirectory();
    } catch (err) {
        console.error(err.message);
    }
};