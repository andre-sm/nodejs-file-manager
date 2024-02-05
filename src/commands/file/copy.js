import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, basename } from 'path';
import * as directoryCommands from '../directory/index.js';
import * as utils from '../../utils/index.js';

export const copyFile = async (filePath, copyPath) => {
    try {
        if (!filePath || !copyPath) {
            throw new Error('Invalid input');
        }

        const fullFilePath = utils.getFullPath(filePath);
        const fullCopyPath = utils.getFullPath(copyPath);

        await access(fullFilePath);
        await access(fullCopyPath);

        const isFile = await utils.fileCheck(fullFilePath);
        const isDirectory = await utils.directoryCheck(fullCopyPath);

        if (!isFile || !isDirectory) {
            throw new Error('Operation failed');
        } 
        
        const fileName = basename(filePath);
        const fullCopyFilePath = join(fullCopyPath, fileName);

        const isAlreadyExist = await utils.fileCheck(fullCopyFilePath);
        if (isAlreadyExist) {
            throw new Error('Operation failed');
        }

        const readStream = createReadStream(fullFilePath, 'utf-8');
        const writaStream = createWriteStream(fullCopyFilePath);
        readStream.pipe(writaStream);

        writaStream.on('finish', () => {
            console.log('File was copied!');
            directoryCommands.printCurrentDirectory();
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
        directoryCommands.printCurrentDirectory();
    }
};