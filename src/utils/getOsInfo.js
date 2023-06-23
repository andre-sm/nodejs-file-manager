import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { printCurrentDirectory } from './manageDirectory.js';

export const getOsInfo = async (arg) => {
    switch (arg) {
        case 'EOL':
            console.log(JSON.stringify(EOL));
            printCurrentDirectory();
            break;
        case 'cpus':
            const cpusData = cpus();
            const cpusInfo = [`Amount of CPUS: ${cpusData.length}`];
            cpusData.forEach((cpu, i) => cpusInfo.push(`CPU${i + 1} model: ${cpu.model}`));
            console.log(cpusInfo.join('\n'));
            printCurrentDirectory();
            break;
        case 'homedir':
            console.log(`Home directory: ${homedir()}`);
            printCurrentDirectory();
            break;
        case 'username':
            console.log(`Current system user name: ${userInfo().username}`);
            printCurrentDirectory();
            break;
        case 'architecture':
            console.log(`CPU architecture: ${arch()}`);
            printCurrentDirectory();
            break;
        default:
            console.error('Invalid input');
    }
}