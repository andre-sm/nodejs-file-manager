import { stdin } from "process";
import * as readline from 'readline/promises';
import { getArgs } from './utils/getArgs.js';
import { printCurrentDirectory, moveUP, goToDirectory } from './utils/manageDirectory.js';

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