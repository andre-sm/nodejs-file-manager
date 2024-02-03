export const splitCommand = (str, hasQuotes) => {
    if (hasQuotes) {
        let firstQuoteIndex = str.search(/['"]/);
        const firstPart = str.slice(0, firstQuoteIndex).split(' ');
        const secondPart = str.slice(firstQuoteIndex).split(/['"]/);
        return [...firstPart, ...secondPart].map(item => item.trim()).filter(item => item);
    }
    return str.trim().split(' ').filter(item => item);
};