import { createReadStream } from "fs";
import { access } from "fs/promises";
import { join } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';

export const readFile = async (pathToFile) => {
    try {
        if (!pathToFile) {
            throw new Error('Invalid input');
        } 
        const fullFilePath = join(getCurrentDirectory(), pathToFile);
        await access(fullFilePath);
    
        const readStream = createReadStream(fullFilePath, 'utf-8');
    
        let data = '';
        readStream.on('data', chunk => data += chunk);
        readStream.on('end', () => {
            console.log(data);
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