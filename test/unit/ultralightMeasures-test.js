/*
 * Copyright 2016 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of iotagent-ul
 *
 * iotagent-ul is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * iotagent-ul is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with iotagent-ul.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[iot_support@tid.es]
 */

'use strict';

var ulParser = require('../../lib/ulParser'),
    should = require('should');

describe('Ultralight 2.0 Parser: measures', function() {
    describe('When a payload with a single measure is parsed', function() {
        it('should return an array with a single object with just one attribute', function() {
            var result = ulParser.parse('a=1');

            should.exist(result);
            (typeof result).should.equal('object');
            result.length.should.equal(1);
            should.exist(result[0]);
            should.exist(result[0].a);
            result[0].a.should.equal('1');
        });
    });
    describe('When a payload with a multiple measures is parsed', function() {
        it('should return an array with a single object with multiple attributes', function() {
            var result = ulParser.parse('c=7|b=18');

            should.exist(result);
            (typeof result).should.equal('object');
            result.length.should.equal(1);
            should.exist(result[0]);
            should.exist(result[0].c);
            result[0].c.should.equal('7');
            should.exist(result[0].b);
            result[0].b.should.equal('18');
        });
    });
    describe('When a payload with two groups of measures and one measure in each group is parsed', function() {
        it('should return an array with two objects with just one attribute', function() {
            var result = ulParser.parse('c=7#b=18');

            should.exist(result);
            (typeof result).should.equal('object');
            result.length.should.equal(2);
            should.exist(result[0]);
            should.exist(result[0].c);
            result[0].c.should.equal('7');
            should.exist(result[1]);
            should.exist(result[1].b);
            result[1].b.should.equal('18');
        });
    });
    describe('When a payload with an empty measure is found: "a=10||"', function() {
        it('should throw a PARSE_ERROR error', function() {
            var result,
                error;

            try {
                result = ulParser.parse('a=10||');
            } catch (e) {
                error = e;
            }

            should.exist(error);
            should.not.exist(result);
            error.name.should.equal('PARSE_ERROR');
        });
    });
    describe('When a payload with an empty measure group is found: "a=10|b=11##t=3"', function() {
        it('should throw a PARSE_ERROR error', function() {
            it('should throw a PARSE_ERROR error', function() {
                var result,
                    error;

                try {
                    result = ulParser.parse('a=10|b=11##t=3');
                } catch (e) {
                    error = e;
                }

                should.exist(error);
                should.not.exist(result);
                error.name.should.equal('PARSE_ERROR');
            });
        });
    });
});