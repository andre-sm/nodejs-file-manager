import { access } from 'fs/promises';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import * as directoryCommands from '../directory/index.js';
import * as utils from '../../utils/index.js';

export const calculateHash = async (filePath) => {
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
        directoryCommands.printCurrentDirectory();
    }
};