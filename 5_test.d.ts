interface Process {
  exit(code?: number): void
  exitWithLogging(code?: number): void
}

// 直接declare变为全局的变量；不想变成全局变量应该加一个命名空间
declare let process: Process
