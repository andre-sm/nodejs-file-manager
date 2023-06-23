import { createReadStream, createWriteStream } from "fs";
import { access, unlink } from "fs/promises";
import { join, basename, isAbsolute } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';

export const copyAndMoveFile = async (filePath, copyPath, isMoving = false) => {
    try {
        if (!filePath || !copyPath) {
            throw new Error('Invalid input');
        }

        const currentDirectory = getCurrentDirectory(); 
        const fullFilePath = isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);
        const fullCopyPath = isAbsolute(copyPath) ? copyPath : join(currentDirectory, copyPath);

        await access(fullFilePath);
        await access(fullCopyPath);
        
        const fileName = basename(filePath);
        const fullCopyFilePath = join(fullCopyPath, fileName);

        const readStream = createReadStream(fullFilePath, 'utf-8');
        const writaStream = createWriteStream(fullCopyFilePath);
        readStream.pipe(writaStream);

        writaStream.on('finish', async () => {
            if (isMoving) {
                await unlink(fullFilePath);
            }
            printCurrentDirectory();
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
};