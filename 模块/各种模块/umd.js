;(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    let v = factory(require, exports)
    if (v !== undefined) module.exports = v
  } else if (typeof define === 'function' && define.amd) {
    define(['require', 'exports', './mod'], factory)
  }
})(function (require, exports) {
  let mod_1 = require('./mod')
  exports.t = mod_1.something + 1
})
// UMD SimpleModule.js
