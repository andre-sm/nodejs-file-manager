import { EOL, cpus, homedir, userInfo, arch } from 'os';
import * as directoryCommands from '../directory/index.js';

export const getOsInfo = async (args) => {
    try {
        if (args.length === 0) {
            console.error('Invalid input');
        } else {
            for (const arg of args) {
                switch (arg.slice(2)) {
                    case 'EOL':
                        console.log(JSON.stringify(EOL));
                        break;
                    case 'cpus':
                        const cpusData = cpus();
                        const cpusInfo = [`Amount of CPUS: ${cpusData.length}`];
                        cpusData.forEach((cpu, i) => {
                            const speed = (cpu.speed / 1000).toFixed(3);
                            cpusInfo.push(`CPU${i + 1} model: ${cpu.model}, clock rate: ${speed} GHz`);
                        });
                        console.log(cpusInfo.join('\n'));
                        break;
                    case 'homedir':
                        console.log(`Home directory: ${homedir()}`);
                        break;
                    case 'username':
                        console.log(`Current system user name: ${userInfo().username}`);
                        break;
                    case 'architecture':
                        console.log(`CPU architecture: ${arch()}`);
                        break;
                    default:
                        console.error('Invalid input');
                }
            }
        }
        directoryCommands.printCurrentDirectory();
    } catch (err) {
        console.error(err.message);
    }
};