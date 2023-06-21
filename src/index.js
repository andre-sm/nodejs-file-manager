import { fileURLToPath } from 'url';
import { dirname } from "path";
import { stdin, stdout } from "process";
import * as readline from 'readline/promises';
import { getArgs } from './utils/getArgs.js';

const startApp = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const userName = getArgs('username') || 'Guest';
    stdout.write(`Welcome to the File Manager, ${userName}!\n`);

    process.on('SIGINT', () => {
        closeProcess(userName);
    });
    
    const readLine = readline.createInterface({ input: stdin });

    for await (const line of readLine) {
        const currentLine = line.toString().trim();
        if (currentLine === '.exit') {
            closeProcess(userName);
        } else {

        }
    }
};

const closeProcess = (name) => {
    stdout.write(`Thank you for using File Manager, ${name}, goodbye!\n`);
    process.exit();
};

await startApp();