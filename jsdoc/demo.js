/**
 * @type {string | boolean}
 */
var sb

// You can specify an HTML Element with DOM properties
/** @type {HTMLElement} */
var myElement = document.querySelector(selector)
element.dataset.myData = ''

/** @type {(s: string, b: boolean) => number} Typescript syntax */
var sbn2

// Parameters may be declared in a variety of syntactic forms
/**@param 语法和 @type 相同，但增加了一个参数名。 使用 [] 可以把参数声明为可选的：
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4) {
  // TODO
}

/**@typedef 可以用来声明复杂类型。 和 @param 类似的语法。
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default
 */
/** @type {SpecialType} */
var specialTypeObject

/**使用 @template 声明泛型：
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @return {T}
 */
function id(x) {
  return x
}
