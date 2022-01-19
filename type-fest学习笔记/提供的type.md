1. tsd 库能够测试类型

```JS
import {expectType, expectError} from 'tsd';
```

2. CamelCase/SnakeCase
3. Split

```JS
const prefixSplit: Split<'--very-prefixed', '-'> = ['', '', 'very', 'prefixed'];
```

4. FixedLengthArray

```JS
type FixedToThreeStrings = FixedLengthArray<string, 3>;
```

5. lodash 的 get
6. Join

```JS
const generalTestVariantMixed: Join<['foo', 0, 'baz'], '.'> = 'foo.0.baz';
```

7. Literal 转 primitive
8. MultidimensionalArray
9. Numerical/Finite/Interger/Float/Negative
10. PackageJson
11. ReadOnlyDeep
    Object/Array/Set/Map `注意Array属于object`
12. TsConfigJson
