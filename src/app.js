import { stdin } from 'process';
import * as readline from 'readline/promises';
import * as fileCommands from './commands/file/index.js';
import * as directoryCommands from './commands/directory/index.js';
import { getOsInfo } from './commands/os/os-info.js';
import * as utils from './utils/index.js';

const startApp = async () => {
    try {
        const userName = utils.getArgs('username') || 'Guest';

        console.log(`Welcome to the File Manager, ${userName}!`);
        directoryCommands.printCurrentDirectory();
        console.log('Please write a command');

        process.on('SIGINT', () => {
            utils.closeProcess(userName);
        });
        
        const readLine = readline.createInterface({ input: stdin });

        for await (const line of readLine) {
            const hasQuotes = utils.checkForQuotes(line);
            const commandArray = utils.splitCommand(line, hasQuotes);

            switch (commandArray[0]) {
                case '.exit':
                    utils.closeProcess(userName);
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
                    await getOsInfo(commandArray.slice(1));
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

await startApp();