/*
 * Bitcoin BIP32 path helpers
 * (C) 2016 Alex Beregszaszi
 */

var BIPPath = function (path) {
  this.path = path
}

BIPPath.fromTrezor = function (path) {
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
      ret[i] |= 0x80000000
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
    if (tmp & 0x80000000) {
      ret[i] = (tmp & ~0x80000000) + (oldStyle ? 'h' : '\'')
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
