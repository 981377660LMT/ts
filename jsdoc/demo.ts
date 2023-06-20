// https://jsdoc.zcopy.site/
// https://jsdoc.zcopy.site/howto-es2015-classes.html

const bar = 2

/**
 * @param args
 * @author caomeinaixi
 * @copyright caomeinaixi
 * @example
 * @see https://jsdoc.zcopy.site/
 * @todo
 * @version 1.0.0
 * @deprecated
 *
 *
 * inline tags link用法 鏈接到文檔中的另一個項目。
 * @param {string} foo - {@link bar}
 * @param {string} bar - {@link https://jsdoc.zcopy.site/tags-inline-link.html}
 *
 */
function foo1(args: any[], kvArgs: Record<any, any>) {}

foo1([1, 2, 3], {
  a: 1,
  b: 2,
})

export {}
