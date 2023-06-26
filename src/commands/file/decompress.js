import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, isAbsolute, parse } from 'path';
import { createBrotliDecompress } from 'zlib';
import * as directoryCommands from '../directory/index.js';

export const decompressFile = async (archivePath, destinationPath) => {
    try {
        if (!archivePath) {
            throw new Error('Invalid input');
        }

        const currentDirectory = directoryCommands.getCurrentDirectory(); 
        const fullArchivePath = isAbsolute(archivePath) ? archivePath : join(currentDirectory, archivePath);
        const fullDestinationPath = isAbsolute(destinationPath) ? destinationPath : join(currentDirectory, destinationPath);

        await access(fullArchivePath);
        await access(fullDestinationPath);
    
        const fileName = parse(archivePath).name;
        const decompressFilePath = join(fullDestinationPath, fileName);

        const brotli = createBrotliDecompress();
        const readStream = createReadStream(fullArchivePath);
        const archiveStream = createWriteStream(decompressFilePath);
        readStream.pipe(brotli).pipe(archiveStream);
        directoryCommands.printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
};