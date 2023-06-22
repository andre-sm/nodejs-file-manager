import { writeFile } from "fs/promises";
import { join } from "path";
import { getCurrentDirectory, printCurrentDirectory } from './manageDirectory.js';

export const createFile = async (fileName) => {
    try {
        if (!fileName) {
            throw new Error('Invalid input');
        } 
        const fullFilePath = join(getCurrentDirectory(), fileName);
        await writeFile(fullFilePath, '');
        printCurrentDirectory();
    } catch (err) {
        console.error(err.message);
    }
};