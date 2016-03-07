# BIPPath

Bitcoin BIP32 ("HD Wallet") path helpers.

There are multiple path representations being used by different implementations. These includes:
- `m/44'/0'/0'/0/0` where the apostrophe means hardened key
- `m/44h/0h/0h/0/0` where the letter `h` means hardened key
- and a binary representation predominantly used by Trezor and compatible wallets

Some useful links:
- [BIP32 specification](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP44 specification](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [BIP39, an online tool to convert/derive keys](https://dcpos.github.io/bip39/)
- [BIP32JP, an online tool to convert/derive keys](https://bip32jp.github.io/english/index.html)


### API

- `BIPPath.fromString(path)` - creates an instance with a path written as text
- `BIPPath.fromTrezor(path)` - creates an instance with a path as an array (Trezor-style)
- `new BIPPath(path)` - alias for `BIPPath.fromTrezor(path)`
- `<bippath>.toTrezor()` - returns a Trezor-style array
- `<bippath>.toString(noRoot, oldStyle)` - returns a text encoded path. Set to `noRoot` to true to omit the `m/` prefix. Set `oldStyle` true to use `h` instead of `'` for marking hardened nodes.
- `BIPPath.validateString(path)` - returns true if the input is a valid path

Trezor-style arrays contain each node as a separate number, where hardened nodes are marked by setting the 32th bit: `m/44'/1/1/0` corresponds to `[ 44 | 0x80000000, 1, 1, 0 ]`


### Examples

```js
var bippath = require('bippath')

bippath.fromTrezor([44 | 0x80000000, 1, 1, 0]).toString() // m/44'/1/1/0

bippath.fromString("m/44'/0'/0'").toString(false, true) // m/44h/0h/0h

bippath.fromString("m/44h/0h/0'").toString(true) // 44'/0'/0'

bippath.fromString("m/44'/0'/0'").toTrezor() // [ 0x80000044, 0x80000000, 0x80000000 ]
```
