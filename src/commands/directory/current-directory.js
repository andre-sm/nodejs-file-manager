import { homedir } from 'os';

let currentDirectory = homedir();

export const printCurrentDirectory = () => {
    console.log(`You are currently in ${currentDirectory}`);
}

export const getCurrentDirectory = () => {
    return currentDirectory;
}

export const setCurrentDirectory = (newCurrentDirectory) => {
    currentDirectory = newCurrentDirectory;
}