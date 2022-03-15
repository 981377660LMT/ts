interface Level {
  id: number
  contents: string
}

// 可以DIY
type LevelMore<T> = T & Level

type TaskObj = LevelMore<{ secTask: LevelMore<{ thirdTask: LevelMore<{ dot: boolean }> }> }>

const task: TaskObj = {
  id: 0,
  contents: 'a',
  secTask: {
    id: 1,
    contents: 'b',
    thirdTask: {
      id: 2,
      contents: 'c',
      dot: false,
    },
  },
}
