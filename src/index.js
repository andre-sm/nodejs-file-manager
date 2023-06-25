import { stdin } from "process";
import * as readline from 'readline/promises';
import { getArgs } from './utils/getArgs.js';
import { printCurrentDirectory, moveUP, goToDirectory, readDirectory } from './utils/manageDirectory.js';
import { readFile } from './utils/readFile.js';
import { createFile } from './utils/createFile.js';
import { renameFile } from './utils/renameFile.js';
import { copyAndMoveFile } from './utils/copyAndMoveFile.js';
import { deleteFile } from './utils/deleteFile.js';
import { getOsInfo } from "./utils/getOsInfo.js";
import { calcHash } from "./utils/calcHash.js";
import { compressFile } from "./utils/compressFile.js";
import { decompressFile } from "./utils/decompressFile.js";

const startApp = async () => {
    const userName = getArgs('username') || 'Guest';

    console.log(`Welcome to the File Manager, ${userName}!`);
    printCurrentDirectory();

    process.on('SIGINT', () => {
        closeProcess(userName);
    });
    
    const readLine = readline.createInterface({ input: stdin });

    for await (const line of readLine) {
        const commandArray = line.toString().trim().split(' ');

        switch (commandArray[0]) {
            case '.exit':
                closeProcess(userName);
                break;
            case 'up':
                await moveUP();
                break;
            case 'cd':
                await goToDirectory(commandArray[1]);
                break;
            case 'ls':
                await readDirectory();
                break;
            case 'cat':
                await readFile(commandArray[1]);
                break;
            case 'add':
                await createFile(commandArray[1]);
                break;
            case 'rn':
                await renameFile(commandArray[1], commandArray[2]);
                break;
            case 'cp':
                await copyAndMoveFile(commandArray[1], commandArray[2]);
                break;
            case 'mv':
                await copyAndMoveFile(commandArray[1], commandArray[2], true);
                break;
            case 'rm':
                await deleteFile(commandArray[1]);
                break;
            case 'os':
                await getOsInfo(commandArray[1].slice(2));
                break;  
            case 'hash':
                await calcHash(commandArray[1]);
                break;  
            case 'compress':
                await compressFile(commandArray[1], commandArray[2]);
                break;
            case 'decompress':
                await decompressFile(commandArray[1], commandArray[2]);
                break;  
            default:
                console.error('Invalid input');
        }
    }
};

const closeProcess = (name) => {
    console.log(`Thank you for using File Manager, ${name}, goodbye!`);
    process.exit();
};

await startApp();