// test error messages for deprecated functions
var assert = require('assert'),
    mathjs = require('../index'),
    number = require('../lib/util/number');

describe('deprecated stuff', function() {

  it ('should throw an error when using deprecated setting number.defaultType', function () {
    assert.throws(function () {
      mathjs({
        number: {
          defaultType: 'number'
        }
      })
    }, /is deprecated/);
  });

  it ('should throw an error when using deprecated setting number.precision', function () {
    assert.throws(function () {
      mathjs({
        number: {
          precision: 14
        }
      })
    }, /is deprecated/);
  });

  it ('should throw an error when using deprecated setting matrix.defaultType', function () {
    assert.throws(function () {
      mathjs({
        matrix: {
          defaultType: 'array'
        }
      })
    }, /is deprecated/);
  });

  it ('should throw an error when using deprecated setting matrix.default', function () {
    assert.throws(function () {
      mathjs({
        matrix: {
          'default': 'array'
        }
      })
    }, /is deprecated/);
  });

  it ('should throw an error when using deprecated math.expression.Scope', function () {
    var math = mathjs();
    assert.throws(function () {
      new math.expression.Scope();
    }, /is deprecated/);
  });

  it ('should throw an error when using deprecated Node.eval', function () {
    var math = mathjs();
    assert.throws(function () {
      new math.expression.node.Node().eval();
    }, /is deprecated/);
  });

  it ('should throw an error when using deprecated function assignment', function () {
    var math = mathjs();
    assert.throws(function () {
      new math.parse('function f(x) = x^2');
    }, /Deprecated keyword "function"/);
  });

  it ('should throw an error when using deprecated notation "scientific in number.format"', function () {
    assert.throws(function () {
      new number.format(2.3, {notation: 'scientific'});
    }, /Format notation "scientific" is deprecated/);
  });

  it ('should throw an error when using deprecated option "scientific in number.format"', function () {
    assert.throws(function () {
      new number.format(2.3, {notation: 'auto', scientific: 5});
    }, /options.scientific is deprecated/);
  });

});
