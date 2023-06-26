import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, isAbsolute, basename } from 'path';
import { createBrotliCompress } from 'zlib';
import * as directoryCommands from '../directory/index.js';
import { directoryCheck } from '../../utils/directory-check.js';
import { fileCheck } from '../../utils/file-check.js';

export const compressFile = async (filePath, destinationPath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        }

        const currentDirectory = directoryCommands.getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);
        const fullDestinationPath = isAbsolute(destinationPath) ? destinationPath : join(currentDirectory, destinationPath);

        await access(fullFilePath);
        await access(fullDestinationPath);

        const isFile = await fileCheck(fullFilePath);
        const isDirectory = await directoryCheck(fullDestinationPath);

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