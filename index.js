/*
 * Bitcoin BIP32 path helpers
 * (C) 2016 Alex Beregszaszi
 */

const HARDENED = 0x80000000

var BIPPath = function (path) {
  this.path = path
}

BIPPath.validateString = function (text) {
  try {
    BIPPath.fromString(text)
    return true
  } catch (e) {
    return false
  }
}

BIPPath.fromTrezor = function (path) {
  // FIXME: check input?
  return new BIPPath(path)
}

BIPPath.fromString = function (text) {
  // skip the root
  if (text.startsWith('m/')) {
    text = text.slice(2)
  }

  var path = text.split('/')
  var ret = new Array(path.length)
  for (var i = 0; i < path.length; i++) {
    var tmp = /(\d+)([hH\']?)/.exec(path[i])
    if (tmp === null) {
      throw new Error('Invalid input')
    }
    ret[i] = parseInt(tmp[1], 10)
    if (tmp[2] === 'h' || tmp[2] === 'H' || tmp[2] === '\'') {
      ret[i] |= HARDENED
    } else if (tmp[2].length != 0) {
      throw new Error('Invalid modifier')
    }
  }
  return new BIPPath(ret)
}

BIPPath.prototype.toTrezor = function () {
  return this.path
}

BIPPath.prototype.toString = function (noRoot, oldStyle) {
  var ret = new Array(this.path.length)
  for (var i = 0; i < this.path.length; i++) {
    var tmp = this.path[i]
    if (tmp & HARDENED) {
      ret[i] = (tmp & ~HARDENED) + (oldStyle ? 'h' : '\'')
    } else {
      ret[i] = tmp
    }
  }
  return (noRoot ? '' : 'm/') + ret.join('/')
}

BIPPath.prototype.inspect = function () {
  return 'BIPPath <' + this.toString() + '>'
}

module.exports = BIPPath
