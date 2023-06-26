import { EOL, cpus, homedir, userInfo, arch } from 'os';
import * as directoryCommands from '../directory/index.js';

export const getOsInfo = async (arg) => {
    switch (arg) {
        case 'EOL':
            console.log(JSON.stringify(EOL));
            directoryCommands.printCurrentDirectory();
            break;
        case 'cpus':
            const cpusData = cpus();
            const cpusInfo = [`Amount of CPUS: ${cpusData.length}`];
            cpusData.forEach((cpu, i) => {
                const speed = (cpu.speed / 1000).toFixed(3);
                cpusInfo.push(`CPU${i + 1} model: ${cpu.model}, clock rate: ${speed} GHz`);
            });
            console.log(cpusInfo.join('\n'));
            directoryCommands.printCurrentDirectory();
            break;
        case 'homedir':
            console.log(`Home directory: ${homedir()}`);
            directoryCommands.printCurrentDirectory();
            break;
        case 'username':
            console.log(`Current system user name: ${userInfo().username}`);
            directoryCommands.printCurrentDirectory();
            break;
        case 'architecture':
            console.log(`CPU architecture: ${arch()}`);
            directoryCommands.printCurrentDirectory();
            break;
        default:
            console.error('Invalid input');
            directoryCommands.printCurrentDirectory();
    }
}