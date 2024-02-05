import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { join, parse } from 'path';
import { createBrotliDecompress } from 'zlib';
import * as directoryCommands from '../directory/index.js';
import * as utils from '../../utils/index.js';

export const decompressFile = async (archivePath, destinationPath) => {
    try {
        if (!archivePath) {
            throw new Error('Invalid input');
        }

        const fullArchivePath = utils.getFullPath(archivePath);
        const fullDestinationPath = utils.getFullPath(destinationPath);

        await access(fullArchivePath);
        await access(fullDestinationPath);

        const isFile = await utils.fileCheck(fullArchivePath);
        const isDirectory = await utils.directoryCheck(fullDestinationPath);

        if (!isFile || !isDirectory) {
            throw new Error('Operation failed');
        }
    
        const fileName = parse(archivePath).name;
        const decompressFilePath = join(fullDestinationPath, fileName);

        const isAlreadyExist = await utils.fileCheck(decompressFilePath);
        if (isAlreadyExist) {
            throw new Error('Operation failed: file already exists');
        }

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