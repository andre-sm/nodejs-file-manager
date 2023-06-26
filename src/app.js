import { stdin } from 'process';
import * as readline from 'readline/promises';
import * as fileCommands from './commands/file/index.js';
import * as directoryCommands from './commands/directory/index.js';
import { getArgs } from './utils/get-args.js';
import { getOsInfo } from './commands/os/os-info.js';

const startApp = async () => {
    try {
        const userName = getArgs('username') || 'Guest';

        console.log(`Welcome to the File Manager, ${userName}!`);
        directoryCommands.printCurrentDirectory();
        console.log('Please write a command');

        process.on('SIGINT', () => {
            closeProcess(userName);
        });
        
        const readLine = readline.createInterface({ input: stdin });

        for await (const line of readLine) {
            const hasQuotes = checkForQuotes(line);
            const commandArray = splitCommand(line, hasQuotes);

            switch (commandArray[0]) {
                case '.exit':
                    closeProcess(userName);
                    break;
                case 'up':
                    await directoryCommands.moveUP();
                    break;
                case 'cd':
                    await directoryCommands.goToDirectory(commandArray[1]);
                    break;
                case 'ls':
                    await directoryCommands.readDirectory();
                    break;
                case 'cat':
                    await fileCommands.readFile(commandArray[1]);
                    break;
                case 'add':
                    await fileCommands.createFile(commandArray[1]);
                    break;
                case 'rn':
                    await fileCommands.renameFile(commandArray[1], commandArray[2]);
                    break;
                case 'cp':
                    await fileCommands.copyFile(commandArray[1], commandArray[2]);
                    break;
                case 'mv':
                    await fileCommands.moveFile(commandArray[1], commandArray[2]);
                    break;
                case 'rm':
                    await fileCommands.deleteFile(commandArray[1]);
                    break;
                case 'os':
                    await getOsInfo(commandArray[1].slice(2));
                    break;  
                case 'hash':
                    await fileCommands.calculateHash(commandArray[1]);
                    break;  
                case 'compress':
                    await fileCommands.compressFile(commandArray[1], commandArray[2]);
                    break;
                case 'decompress':
                    await fileCommands.decompressFile(commandArray[1], commandArray[2]);
                    break;  
                default:
                    console.error('Invalid input');
                    directoryCommands.printCurrentDirectory();
            }
        }
    } catch (err) {
        console.error(err.message);
    }
};

const closeProcess = (name) => {
    console.log(`Thank you for using File Manager, ${name}, goodbye!`);
    process.exit();
};

const checkForQuotes = (str) => {
    return /['"]/.test(str);
};

const splitCommand = (str, hasQuotes) => {
    if (hasQuotes) {
        let firstQuoteIndex = str.search(/['"]/);
        const firstPart = str.slice(0, firstQuoteIndex).split(' ');
        const secondPart = str.slice(firstQuoteIndex).split(/['"]/);
        return [...firstPart, ...secondPart].map(item => item.trim()).filter(item => item);
    }
    return str.trim().split(' ').filter(item => item);
};

await startApp();