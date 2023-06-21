import { join } from "path";
import { access } from "fs/promises";
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

export const goToDirectory = async (path) => {
    try {
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