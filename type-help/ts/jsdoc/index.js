//@ts-check

/**@type {number} */
const foo = 'aa'

/** @type {{ name: string, age: number }} */
const foo = { name: 'zce', age: 25 }

/**
 * @param {string} name name
 * @param {number} age nuber
 * @returns {string}
 */
function foo(name, age) {
  return `${name} ${age}`
}

/**
 *
 * @typedef {'open' | 'close'} Status
 */
