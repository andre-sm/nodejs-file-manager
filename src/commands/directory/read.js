import { readdir } from 'fs/promises';
import { getCurrentDirectory, printCurrentDirectory } from './current-directory.js';

export const readDirectory = async () => {
    try {
        const directoryData = await readdir(getCurrentDirectory(), { withFileTypes: true });
        const folders = [];
        const files = [];
        directoryData.forEach(item => {
            if (item.isDirectory()) {
                folders.push({ 'Name': item.name, 'Type': 'directory' });
            } else {
                files.push({ 'Name': item.name, 'Type': 'file' });
            }
        });
        console.table([...folders.sort((a, b) => a - b), ...files.sort((a, b) => a - b)]);
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
}