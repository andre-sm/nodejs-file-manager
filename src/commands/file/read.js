import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { join, isAbsolute } from 'path';
import * as directoryCommands from '../directory/index.js';
import { fileCheck } from '../../utils/file-check.js';

export const readFile = async (filePath) => {
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
    
        const readStream = createReadStream(fullFilePath, 'utf-8');
    
        let data = '';
        readStream.on('data', chunk => data += chunk);
        readStream.on('end', () => {
            console.log(data);
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