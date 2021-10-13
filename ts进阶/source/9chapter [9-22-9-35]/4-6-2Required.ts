interface Error {
  name: string;
  message: string;
  stack?: string;
}

interface SyntaxError extends Error {
}

interface CompilerError extends SyntaxError {
  code: number//200 404 500
  loc?: SourceLocation
}
// 作业 name: string;
// message: string;
// stack: string;  从哪儿来的
type compileErrorType = Required<CompilerError>

export interface SourceLocation {
  start: Position
  end: Position
  source: string
}
export interface Position {
  offset: number // from start of file
  line: number
  column: number
}