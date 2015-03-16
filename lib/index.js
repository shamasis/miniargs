var E = '',
    patt = /^(-[^-\s]|--[^-\s].+)$/g; // pattern to detect single or double hyphen start

/**
 * @param {array} argv
 * @returns {object}
 *
 * @example
 * var args = require('./quickargs.js')(process.argv);
 */
module.exports = function (argv) {
    var args = {}, // object to store all key-value argument extraction
        lastarg; // args are split by space, so we keep a track of last key detected
        
    argv && argv.slice && argv.slice(2).forEach(function (item) {
        lastarg = patt.test(item) ? item.replace(patt, E) : (lastarg && (args[lastarg] = item), undefined);
    });
 
    return args;
};