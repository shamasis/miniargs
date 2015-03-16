var expect = require('expect.js'),
	miniargs;

describe('miniargs', function () {
	it ('module must be require-able', function () {
		var error;

		try {
			miniargs = require('../lib/index.js');
		}
		catch (e) {
			error = e;
		}

		expect(error).to.not.be.ok();
		expect(miniargs).to.be.ok();
		expect(typeof miniargs).to.be('function');
	});

	it ('must handle blank parameters', function () {
		expect(miniargs()).to.eql({});
		expect(miniargs(null)).to.eql({});
		expect(miniargs(false)).to.eql({});
		expect(miniargs([])).to.eql({});
		expect(miniargs({})).to.eql({});
	});

	it ('must ignore first two argument parameters', function () {
		expect(miniargs(['first', 'second', 'third', 'undefined'])).to.eql({third: undefined});
	});
});