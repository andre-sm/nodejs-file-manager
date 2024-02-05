import { join, isAbsolute } from 'path';
import * as directoryCommands from '../commands/directory/index.js';

export const getFullPath = (path) => {
    const currentDirectory = directoryCommands.getCurrentDirectory();
    return isAbsolute(path) ? path : join(currentDirectory, path);
};
