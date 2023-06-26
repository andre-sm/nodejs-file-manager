import { access, unlink } from 'fs/promises';
import { join, isAbsolute } from 'path';
import * as directoryCommands from '../directory/index.js';
import { fileCheck } from '../../utils/file-check.js';

export const deleteFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        } 

        const currentDirectory = directoryCommands.getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);

        await access(fullFilePath);
        const isFile = await fileCheck(fullFilePath);
        if (!isFile) {
            throw new Error('Operation failed');
        } 

        await unlink(fullFilePath);
        console.log('File was deleted!');
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