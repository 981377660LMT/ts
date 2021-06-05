System.register(['./mod'], function (exports_1) {
  let mod_1
  let t
  return {
    setters: [
      function (mod_1_1) {
        mod_1 = mod_1_1
      },
    ],
    execute: function () {
      exports_1('t', (t = mod_1.something + 1))
    },
  }
})
// System SimpleModule.js
