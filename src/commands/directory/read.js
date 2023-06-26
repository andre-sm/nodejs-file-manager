import { readdir } from 'fs/promises';
import * as directoryCommands from './index.js';

export const readDirectory = async () => {
    try {
        const directoryData = await readdir(directoryCommands.getCurrentDirectory(), { withFileTypes: true });
        const folders = [];
        const files = [];
        directoryData.forEach(item => {
            if (item.isDirectory()) {
                folders.push({ 'Name': item.name, 'Type': 'directory' });
            } else {
                files.push({ 'Name': item.name, 'Type': 'file' });
            }
        });
        const dataToPrint = [...folders.sort((a, b) => a - b), ...files.sort((a, b) => a - b)];
        if (dataToPrint.length > 0) {
            console.table(dataToPrint);
        } else {
            console.log('Directory is empty!');
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    } finally {
        directoryCommands.printCurrentDirectory();
    }
}