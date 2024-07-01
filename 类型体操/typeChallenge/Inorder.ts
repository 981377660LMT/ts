interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

// 所以要执行操作时一般采用正向判断。
type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
  : []

// 中序遍历
type TestInorderTraversal = InorderTraversal<{ val: 1; left: { val: 2; left: null; right: null }; right: { val: 3; left: null; right: null } }>
