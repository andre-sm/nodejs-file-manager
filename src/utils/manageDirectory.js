import { join } from "path";
import { access, readdir } from "fs/promises";
import { homedir } from 'os';

let currentDirectory = homedir();

export const printCurrentDirectory = () => {
    console.log(`You are currently in ${currentDirectory}`);
}

export const getCurrentDirectory = () => {
    return currentDirectory;
}

export const moveUP = async () => {
    try {
        const newDirectory = join(currentDirectory, '../');
        await access(newDirectory);
        currentDirectory = newDirectory;
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
}

export const goToDirectory = async (path = null) => {
    try {
        if (!path) {
            throw new Error('Invalid input');
        } 
        const newDirectory = join(currentDirectory, path);
        await access(newDirectory);
        currentDirectory = newDirectory;
        printCurrentDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
}

export const readDirectory = async () => {
    try {
        const directoryData = await readdir(currentDirectory, { withFileTypes: true });
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
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Operation failed');
        } else {
            console.error(err.message);
        }
    }
}