'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var formatter = require('../');

var findings = require('./fixtures/findings.json');

describe('formatter', function () {
    it('creates correct finding output', function () {
        var file = path.join(__dirname, 'fixtures', 'findings.txt');
        var expected = fs.readFileSync(file).toString();
        var actual = formatter(null, findings, 'package.json').replace("\r\n", "\n");
        // Uncomment to update the output of the test to compare with
        //fs.writeFileSync(path.join(__dirname, 'fixtures', 'findings.txt', actual, {encoding: 'utf-8'});
        expect(actual).to.equal(expected);
    });

    describe('prints debug output on error', function () {
        it('when data is a buffer', function () {
            var data = new Buffer('Foo!', 'utf-8'),
                actual = formatter(
                    new Error('Some nasty error'),
                    data,
                    'package.json'
                );

            expect(actual).to.equal('Debug output: "Foo!"\nError: Some nasty error');
        });

        it('when data is not a buffer', function () {
            var data = { foo: 'bar' },
                actual = formatter(
                    new Error('Some nasty error'),
                    data,
                    'package.json'
                );

            expect(actual).to.equal('Debug output: {"foo":"bar"}\nError: Some nasty error');
        });
    });
});
