import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, basename, isAbsolute } from 'path';
import * as directoryCommands from '../directory/index.js';
import { directoryCheck } from '../../utils/directory-check.js';
import { fileCheck } from '../../utils/file-check.js';

export const copyFile = async (filePath, copyPath) => {
    try {
        if (!filePath || !copyPath) {
            throw new Error('Invalid input');
        }

        const currentDirectory = directoryCommands.getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);
        const fullCopyPath = isAbsolute(copyPath) ? copyPath : join(currentDirectory, copyPath);

        await access(fullFilePath);
        await access(fullCopyPath);

        const isFile = await fileCheck(fullFilePath);
        const isDirectory = await directoryCheck(fullCopyPath);

        if (!isFile || !isDirectory) {
            throw new Error('Operation failed');
        } 
        
        const fileName = basename(filePath);
        const fullCopyFilePath = join(fullCopyPath, fileName);

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