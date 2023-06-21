const getArgs = (key) => {
    let argsPairs = {};
    process.argv.slice(2).forEach((arg, i) => {
        const argArray = arg.split('=');
        argsPairs[argArray[0].slice(2)] = argArray[1] || null;
    });
    return argsPairs[key];
};

export { getArgs };