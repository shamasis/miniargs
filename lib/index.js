var undef,
    rep = '$2$4',
    patt = /(^-([^-\s]$))|(^--([^-\s][\s\S]+$))/, // pattern to detect single or double hyphen start
    parse;

/**
 * @param {array} argv
 * @returns {object}
 *
 * @example
 * var args = require('miniargs').parse(process.argv);
 */
parse = function (argv) {
    var args = {}, // object to store all key-value argument extraction
        arg; // args are split by space, so we keep a track of last key detected

    argv && argv.slice && argv.slice(2).forEach(function (item) {
        patt.test(item) ?
            ((arg = item.replace(patt, rep)), args[arg] = undef) :
            (arg && (args[arg] = item), (arg = undef));
    });

    return args;
};

// export parse function
module.exports = {
    parse: parse
};
