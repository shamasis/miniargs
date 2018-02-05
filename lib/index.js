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

    // we would iterate on entire command line arguments that were pre-split using spaces. (the first two being system
    // arguments and skipped). In essence, the loop would run in a toggle-mode where one run would have the parameter
    // name and the second run is expected to be the value (or next parmeter)
    argv && argv.slice && argv.slice(2).forEach(function (item) {
        // decide wthether the item is a parameter name or the value of previous paramter name detected.
        if (patt.test(item)) {
            arg = item.replace(patt, rep); // clean the hyphens
            !args.hasOwnProperty(arg) && (args[arg] = undef); // add one key to object if none exist
        }
        else if (arg) { // now the item should be a value
            // if the value of arg is undefined, it implies that this is the first occurance of a parameter's value and
            // we simply assign the value to the same
            if (args[arg] === undef) {
                args[arg] = item;
            }
            // if we are here, it implies that we already have one parameter defined with the same name and as such
            // we decide to append or create a new array based on the results
            else if (Array.isArray(args[arg])) {
                args[arg].push(item);
            }
            else {
                args[arg] = [args[arg], item];
            }

            arg = undef; // clear parameter state
        }
    });

    return args;
};

// export parse function
module.exports = {
    parse: parse
};
