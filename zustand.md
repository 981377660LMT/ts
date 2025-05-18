```ts
type Mutate<S, Ms> = number extends Ms['length' & keyof Ms]
  ? S
  : Ms extends []
    ? S
    : Ms extends [[infer Mi, infer Ma], ...infer Mrs]
      ? Mutate<StoreMutators<S, Ma>[Mi & StoreMutatorIdentifier], Mrs>
      : never
```

这段类型的作用是**递归地对 S 应用一组“mutator”操作**，常见于 Zustand 这类状态管理库的类型体操。逐步解释如下：

1. number extends Ms['length' & keyof Ms] ? S

- 检查 Ms 是否为数组类型（而不是元组）。如果 Ms 是普通数组（长度为 number），直接返回 S，不做处理。

2. `Ms extends [] ? S`

   - 如果 Ms 是空元组，递归结束，返回 S。

3. `Ms extends [[infer Mi, infer Ma], ...infer Mrs] ? ...`

   - 如果 Ms 是形如 `[[Mi, Ma], ...Mrs]` 的元组，取出第一个 mutator（Mi, Ma），剩下的 Mrs 递归处理。

4. Mutate<StoreMutators<S, Ma>[Mi & StoreMutatorIdentifier], Mrs>

- 对 S 应用 mutator（Mi, Ma），得到新的 S，然后递归处理剩下的 Mrs。

5. `: never`
   - 其他情况类型为 never。

**总结**：

Mutate<S, Ms>

会把 Ms 里的每个 mutator 依次应用到 S 上，最终返回变换后的类型 S。  
常用于类型安全地组合多个“状态变换器”。

---
