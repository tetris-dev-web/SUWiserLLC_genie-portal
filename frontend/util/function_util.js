export const roundToTwo = num => Math.round(num * 100) / 100;
export const getFileExtension = fileName => /\.(\w+)$/.exec(fileName)[1];