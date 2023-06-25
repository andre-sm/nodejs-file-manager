import { createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises";
import { join, isAbsolute, basename } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';
import { createBrotliCompress } from "zlib";

export const compressFile = async (filePath, destinationPath) => {
    try {
        if (!filePath) {
            throw new Error('Invalid input');
        }

        const currentDirectory = getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);
        const fullDestinationPath = isAbsolute(destinationPath) ? destinationPath : join(currentDirectory, destinationPath);

        await access(fullFilePath);
        await access(fullDestinationPath);
    
        const fileName = basename(filePath);
        const archivePath = join(fullDestinationPath, `${fileName}.br`);

        const brotli = createBrotliCompress();
        const readStream = createReadStream(fullFilePath);
        const archiveStream = createWriteStream(archivePath);
        readStream.pipe(brotli).pipe(archiveStream);
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
};