Don't use `Object` as a type. The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.

- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.
- If you want a type meaning "any value", you probably want `unknown` instead.

---

Don't use `{}` as a type. `{}` actually means "any non-nullish value".

- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.
- If you want a type meaning "any value", you probably want `unknown` instead.
- If you want a type meaning "empty object", you probably want `Record<string, never>` instead.

---

理解：**Object 和 {} 是同一个类型(非空类型)，object 表示非基本类型，Record<string, unknown> 表示对象**
