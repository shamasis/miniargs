/* global describe, it */
var expect = require('expect.js'),
miniargs;

describe('miniargs', function () {
    it('module must be require-able', function () {
        var error;

        try {
            miniargs = require('../lib/index.js');
        }
        catch (e) {
            error = e;
        }

        expect(error).to.not.be.ok();
        expect(miniargs).to.be.ok();
        expect(typeof miniargs).to.be('object');
    });

    it('.parse() function must be available', function () {
        expect(miniargs && (typeof miniargs.parse)).to.be('function');
    });

    it('must handle blank parameters', function () {
        expect(miniargs.parse()).to.eql({});
        expect(miniargs.parse(null)).to.eql({});
        expect(miniargs.parse(false)).to.eql({});
        expect(miniargs.parse([])).to.eql({});
        expect(miniargs.parse({})).to.eql({});
    });

    it('must ignore first two argument parameters (as from process.argv)', function () {
        expect(miniargs.parse(['first', 'second'])).to.eql({});
        expect(miniargs.parse(['first', 'second', '-t', 'works'])).to.eql({
            t: 'works'
        });
    });

    it('must accept single hyphen arguments', function () {
        expect(miniargs.parse(['', '', '-a', 'y', '-b', 'n'])).to.eql({
            a: 'y',
            b: 'n'
        });
    });

    it('must set undefined to value of value-less parameters', function () {
        expect(miniargs.parse(['', '', '-p', '--param'])).to.eql({
            p: undefined,
            param: undefined
        });
    });

    it('must not accept single hyphen arguments having more than one character', function () {
        expect(miniargs.parse(['', '', '-pp', 'value'])).to.eql({});
    });

    it('must not accept double hyphen arguments with just one character', function () {
        expect(miniargs.parse(['', '', '--p', 'value'])).to.eql({});
    });

    it('must not accept whitespace or hyphen between hyphen and character', function () {
        expect(miniargs.parse(['', '', '- p', 'v', '-- param', 'value', '---param2', 'value2'])).to.eql({});
    });

    it('must allow hyphen between param name', function () {
        expect(miniargs.parse(['', '', '--param-name', 'value'])).to.eql({
            'param-name': 'value'
        });
    });
});
