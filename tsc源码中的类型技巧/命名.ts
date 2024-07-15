interface Api {
  lookAhead<T>(callback: () => T): T
  scanRange<T>(start: number, length: number, callback: () => T): T
  tryScan<T>(callback: () => T): T
}
