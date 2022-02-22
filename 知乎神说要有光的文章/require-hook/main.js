const fs = require('fs')
const ts = require('typescript')
const path = require('path')

const filePath = process.argv[2]

require.extensions['.ts'] = function (module, filename) {
  // 修改代码
  const fileFullPath = path.resolve(__dirname, filename)
  const content = fs.readFileSync(fileFullPath, 'utf-8')
  const { outputText } = ts.transpileModule(content, {
    // compilerOptions: require('./tsconfig.json'),
  })
  console.log(outputText)
  module._compile(outputText, filename)
}

const { add } = require('./util.ts')
