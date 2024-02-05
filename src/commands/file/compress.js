import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, basename } from 'path';
import { createBrotliCompress } from 'zlib';
import * as directoryCommands from '../directory/index.js';
import * as utils from '../../utils/index.js';

export const compressFile = async (filePath, destinationPath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        }

        const fullFilePath = utils.getFullPath(filePath);
        const fullDestinationPath = utils.getFullPath(destinationPath);

        await access(fullFilePath);
        await access(fullDestinationPath);

        const isFile = await utils.fileCheck(fullFilePath);
        const isDirectory = await utils.directoryCheck(fullDestinationPath);

        if (!isFile || !isDirectory) {
            throw new Error('Operation failed');
        } 
    
        const fileName = basename(filePath);
        const archivePath = join(fullDestinationPath, `${fileName}.br`);

        const brotli = createBrotliCompress();
        const readStream = createReadStream(fullFilePath);
        const archiveStream = createWriteStream(archivePath);
        readStream.pipe(brotli).pipe(archiveStream);
        console.log('File was compressed!');
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