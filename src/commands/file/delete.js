import { access, unlink } from 'fs/promises';
import * as directoryCommands from '../directory/index.js';
import * as utils from '../../utils/index.js';

export const deleteFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        } 

        const fullFilePath = utils.getFullPath(filePath);

        await access(fullFilePath);
        const isFile = await utils.fileCheck(fullFilePath);
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