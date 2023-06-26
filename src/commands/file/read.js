import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { join, isAbsolute, resolve } from 'path';
import * as directoryCommands from '../directory/index.js';

export const readFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        }

        const currentDirectory = directoryCommands.getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);
        console.log(resolve(fullFilePath));
        await access(fullFilePath);
    
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
    }
};