// test data type Complex

var assert = require('assert'),
    Complex = require('../../lib/type/Complex');

describe('Complex', function () {

  assertComplex = function(complex, re, im) {
    assert(complex instanceof Complex);
    assert.strictEqual(complex.re, re);
    assert.strictEqual(complex.im, im);
  };

  describe('constructor', function() {

    it('should create a complex number correctly', function () {
      var complex1 = new Complex(3, -4);
      assertComplex(complex1, 3, -4);

      var complex2 = new Complex();
      assertComplex(complex2, 0, 0);
    });

    it('should throw an error if called with wrong number of arguments', function() {
      assert.throws(function () { new Complex(3, -4, 5); });
      assert.throws(function () { new Complex(1); });
    });

    it('should throw an error if called with wrong type of arguments', function() {
      assert.throws(function () { new Complex(1, true); });
      assert.throws(function () { new Complex(true, 2); });
    });

    it('should throw an error if called without new operator', function() {
      assert.throws(function () { Complex(3, -4); });
    });

  });

  describe('toString', function() {

    it('stringify a complex number', function() {
      assert.equal(new Complex(3, -4).toString(), '3 - 4i');
      assert.equal(new Complex().toString(), '0');
      assert.equal(new Complex(2, 3).toString(), '2 + 3i');
      assert.equal(new Complex(2, 0).toString(), '2');
      assert.equal(new Complex(0, 3).toString(), '3i');
      assert.equal(new Complex().toString(),      '0');
      assert.equal(new Complex(0, 2).toString(),  '2i');
      assert.equal(new Complex(0, 1).toString(),  'i');
      assert.equal(new Complex(1, 1).toString(),  '1 + i');
      assert.equal(new Complex(1, 2).toString(),  '1 + 2i');
      assert.equal(new Complex(1, -1).toString(), '1 - i');
      assert.equal(new Complex(1, -2).toString(), '1 - 2i');
      assert.equal(new Complex(1, 0).toString(),  '1');
      assert.equal(new Complex(-1, 2).toString(), '-1 + 2i');
      assert.equal(new Complex(-1, 1).toString(), '-1 + i');
    });

    it('should not round off digits', function() {
      assert.equal(new Complex(1/3, 1/3).toString(), '0.3333333333333333 + 0.3333333333333333i');

    });
  });

  describe('format', function() {

    it('should format a complex number', function() {
      assert.equal(new Complex(2, 3).format(), '2 + 3i');
      assert.equal(new Complex(2, -3).format(), '2 - 3i');
      assert.equal(new Complex(-2, 3).format(), '-2 + 3i');
      assert.equal(new Complex(-2, -3).format(), '-2 - 3i');
      assert.equal(new Complex(2, 1).format(), '2 + i');
      assert.equal(new Complex(2, -1).format(), '2 - i');
      assert.equal(new Complex(2, 0).format(), '2');
      assert.equal(new Complex(0, 2).format(), '2i');
    });

    it('should format a complex number with custom precision', function() {
      assert.equal(new Complex(1/3, 1/3).format(3), '0.333 + 0.333i');
      assert.equal(new Complex(1/3, 1/3).format(4), '0.3333 + 0.3333i');
      assert.equal(new Complex(1/3, 1/3).format(), '0.3333333333333333 + 0.3333333333333333i');
    });

  });

  describe('parse', function() {

    it('should parse rightly', function () {
      assertComplex(Complex.parse('2 + 3i'), 2, 3);
      assertComplex(Complex.parse('2 +3i'), 2, 3);
      assertComplex(Complex.parse('2+3i'), 2, 3);
      assertComplex(Complex.parse(' 2+3i '), 2, 3);

      assertComplex(Complex.parse('2-3i'), 2, -3);
      assertComplex(Complex.parse('2 + i'), 2, 1);
      assertComplex(Complex.parse('-2-3i'), -2, - 3);
      assertComplex(Complex.parse('-2+3i'), -2, 3);
      assertComplex(Complex.parse('-2+-3i'), -2, -3);
      assertComplex(Complex.parse('-2-+3i'), -2, -3);
      assertComplex(Complex.parse('+2-+3i'), 2, -3);
      assertComplex(Complex.parse('+2-+3i'), 2, -3);
      assertComplex(Complex.parse('2 + 3i'), 2, 3);
      assertComplex(Complex.parse('2 - -3i'), 2, 3);
      assertComplex(Complex.parse(' 2 + 3i '), 2, 3);
      assertComplex(Complex.parse('2 + i'), 2, 1);
      assertComplex(Complex.parse('2 - i'), 2, -1);
      assertComplex(Complex.parse('2 + -i'), 2, -1);
      assertComplex(Complex.parse('-2+3e-1i'), -2, 0.3);
      assertComplex(Complex.parse('-2+3e+1i'), -2, 30);
      assertComplex(Complex.parse('2+3e2i'), 2, 300);
      assertComplex(Complex.parse('2.2e-1-3.2e-1i'), 0.22, -0.32);
      assertComplex(Complex.parse('2.2e-1-+3.2e-1i'), 0.22, -0.32);
      assertComplex(Complex.parse('2'), 2, 0);
      assertComplex(Complex.parse('i'), 0, 1);
      assertComplex(Complex.parse(' i '), 0, 1);
      assertComplex(Complex.parse('-i'), 0, -1);
      assertComplex(Complex.parse(' -i '), 0, -1);
      assertComplex(Complex.parse('+i'), 0, 1);
      assertComplex(Complex.parse(' +i '), 0, 1);
      assertComplex(Complex.parse('-2'), -2, 0);
      assertComplex(Complex.parse('3I'), 0, 3);
      assertComplex(Complex.parse('-3i'), 0, -3);
      assertComplex(Complex.parse('.2i'), 0, 0.2);
      assertComplex(Complex.parse('.2'), 0.2, 0);
      assertComplex(Complex.parse('2.i'), 0, 2);
      assertComplex(Complex.parse('2.'), 2, 0);
    });

    it('should return null if called with an invalid string', function() {
      assert.strictEqual(Complex.parse('str', 2), null);
      assert.strictEqual(Complex.parse(''), null);
      assert.strictEqual(Complex.parse('2r'), null);
      assert.strictEqual(Complex.parse('str'), null);
      assert.strictEqual(Complex.parse('2i+3i'), null);
      assert.strictEqual(Complex.parse('2ia'), null);
      assert.strictEqual(Complex.parse('3+4'), null);
      assert.strictEqual(Complex.parse('3i+4'), null);
      assert.strictEqual(Complex.parse('3e + 4i'), null);
      assert.strictEqual(Complex.parse('3 + 4i bla'), null);
      assert.strictEqual(Complex.parse('3e1.2 + 4i'), null);
      assert.strictEqual(Complex.parse('3e1.2i'), null);
      assert.strictEqual(Complex.parse('3e1.2i'), null);
      assert.strictEqual(Complex.parse('- i'), null);
      assert.strictEqual(Complex.parse('+ i'), null);
      assert.strictEqual(Complex.parse('.'), null);
      assert.strictEqual(Complex.parse('2 + .i'), null);
      assert.strictEqual(Complex.parse('4i bla'), null);
      assert.strictEqual(Complex.parse('i bla'), null);
      assert.strictEqual(Complex.parse(2), null);
    });

  });

  describe('clone', function() {

    it('should clone the complex properly', function () {
      var complex1 = new Complex(3, -4);
      var clone = complex1.clone();
      clone.re = 100;
      clone.im = 200;
      assert.notEqual(complex1, clone);
      assert.equal(complex1.re, 3);
      assert.equal(complex1.im, -4);
      assert.equal(clone.re, 100);
      assert.equal(clone.im, 200);
    });

  });

  describe('equals', function() {

    it('should test equality of two complex numbers', function () {
      assert.equal(new Complex(2, 4).equals(new Complex(2, 4)), true);
      assert.equal(new Complex(2, 3).equals(new Complex(2, 4)), false);
      assert.equal(new Complex(2, 4).equals(new Complex(1, 4)), false);
      assert.equal(new Complex(2, 4).equals(new Complex(1, 3)), false);
      assert.equal(new Complex(2, 4).equals(new Complex(2, 0)), false);
      assert.equal(new Complex(2, 4).equals(new Complex(0, 4)), false);
      assert.equal(new Complex(0, 0).equals(new Complex()), true);
    });

  });

});