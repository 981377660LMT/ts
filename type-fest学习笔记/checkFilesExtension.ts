import { PathLike } from 'fs'
import { readdir } from 'fs/promises'

/**
 *
 * @param path 'src'
 * @param endswith '.d.ts'
 * @description 检查一个文件夹下所有文件是否符合后缀
 */
const checkSourceFilesExtension = async (path: PathLike, endswith: string) => {
  try {
    const files = await readdir(path)

    let hasIncorrectFileExtension = false
    for (const file of files) {
      if (!file.endsWith(endswith)) {
        hasIncorrectFileExtension = true
        console.error(`source/${file} extension should be \`.d.ts\`.`)
      }
    }

    if (hasIncorrectFileExtension) {
      process.exitCode = 1
    }
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
}

export { checkSourceFilesExtension }
