/* global describe, it */

var assert = require('assert')
var bippath = require('../')

describe('fromTrezor()', function () {
  it('should work with proper input', function () {
    assert.equal(bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toString(), 'm/44\'/1/1/0')
  })
  it('should fail for no parameter', function () {
    assert.throws(function () {
      bippath.fromTrezor()
    })
  })
  it('should fail for number', function () {
    assert.throws(function () {
      bippath.fromTrezor(1)
    })
  })
  it('should fail for string', function () {
    assert.throws(function () {
      bippath.fromTrezor('wrong')
    })
  })
  it('should fail for empty array', function () {
    assert.throws(function () {
      bippath.fromTrezor([])
    })
  })
  it('should fail for non-number array', function () {
    assert.throws(function () {
      bippath.fromTrezor([ 1, 'wrong' ])
    })
  })
})

describe('toTrezor()', function () {
  it('should work with proper input', function () {
    assert.deepEqual(bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toTrezor(), [ 44 | 0x80000000, 1, 1, 0 ])
  })
})

describe('fromString()', function () {
  it('should work with new style input', function () {
    assert.equal(bippath.fromString('m/44\'/0\'/0\'').toString(), 'm/44\'/0\'/0\'')
  })
  it('should work with old style input', function () {
    assert.equal(bippath.fromString('m/44h/0h/0\'').toString(), 'm/44\'/0\'/0\'')
  })
  it('should work without m/ prefixt', function () {
    assert.equal(bippath.fromString('44\'/0\'/0\'').toString(), 'm/44\'/0\'/0\'')
  })
})

describe('toString()', function () {
  it('should work with new style ouput', function () {
    assert.equal(bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toString(), 'm/44\'/1/1/0')
  })
  it('should work with old style ouput', function () {
    assert.equal(bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toString(false, true), 'm/44h/1/1/0')
  })
  it('should work with new style ouput (without m/ prefix)', function () {
    assert.equal(bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toString(true), '44\'/1/1/0')
  })
  it('should work with old style ouput (without m/ prefix)', function () {
    assert.equal(bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toString(true, true), '44h/1/1/0')
  })
})

describe('validateString()', function () {
  it('should work', function () {
    assert.equal(bippath.validateString('m/44/1'), true);
    assert.equal(bippath.validateString('m/44\'/1'), true);
    assert.equal(bippath.validateString('44/1'), true);
    assert.equal(bippath.validateString('44\'/1'), true);
  })
  it('should fail', function () {
    assert.equal(bippath.validateString('wrong'), false);
    assert.equal(bippath.validateString('m/44  /'), false);
    assert.equal(bippath.validateString(''), false);
  })
})

describe('validateTrezor()', function () {
  it('should work', function () {
    assert.equal(bippath.validateTrezor([ 44 ]), true);
    assert.equal(bippath.validateTrezor([ 44 | 0x80000000, 1 ]), true);
  })
  it('should fail', function () {
    assert.equal(bippath.validateTrezor(), false);
    assert.equal(bippath.validateTrezor(1), false);
    assert.equal(bippath.validateTrezor('wrong'), false);
    assert.equal(bippath.validateTrezor([]), false);
    assert.equal(bippath.validateTrezor([ 'wrong' ]), false);
  })
})
