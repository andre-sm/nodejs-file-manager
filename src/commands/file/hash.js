import { access } from 'fs/promises';
import { createReadStream } from 'fs';
import { join, isAbsolute } from 'path';
import { createHash } from 'crypto';
import * as directoryCommands from '../directory/index.js';

export const calculateHash = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        }

        const fullFilePath = isAbsolute(filePath) ? filePath : join(directoryCommands.getCurrentDirectory(), filePath);
        await access(fullFilePath);
    
        const hash = createHash('sha256');
        const readStream = createReadStream(fullFilePath);

        readStream.on('data', (chunk) => {
            hash.update(chunk);
        });
        readStream.on('end', () => {
            const resultHash = hash.digest('hex');
            console.log(`Hash of the file: ${resultHash}`);
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