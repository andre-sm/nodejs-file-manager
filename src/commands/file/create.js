import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as directoryCommands from '../directory/index.js';
import * as utils from '../../utils/index.js';

export const createFile = async (fileName) => {
    try {
        if (!fileName) {
            throw new Error('Invalid input');
        } 
        const fullFilePath = join(directoryCommands.getCurrentDirectory(), fileName);

        const isAlreadyExist = await utils.fileCheck(fullFilePath);
        if (isAlreadyExist) {
            throw new Error('Operation failed');
        }

        await writeFile(fullFilePath, '');
        console.log('File was created!');
    } catch (err) {
        console.error(err.message);
    } finally {
        directoryCommands.printCurrentDirectory();
    }
};