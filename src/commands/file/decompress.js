import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, isAbsolute, parse } from 'path';
import { createBrotliDecompress } from 'zlib';
import * as directoryCommands from '../directory/index.js';
import { directoryCheck } from '../../utils/directory-check.js';
import { fileCheck } from '../../utils/file-check.js';

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

        const isFile = await fileCheck(fullArchivePath);
        const isDirectory = await directoryCheck(fullDestinationPath);

        if (!isFile || !isDirectory) {
            throw new Error('Operation failed');
        }
    
        const fileName = parse(archivePath).name;
        const decompressFilePath = join(fullDestinationPath, fileName);

        const brotli = createBrotliDecompress();
        const readStream = createReadStream(fullArchivePath);
        const archiveStream = createWriteStream(decompressFilePath);
        readStream.pipe(brotli).pipe(archiveStream);
        console.log('File was decompressed!');
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