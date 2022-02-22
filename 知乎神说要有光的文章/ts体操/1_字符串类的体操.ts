// 递归构造字符串的时候要通过`递归构造数组`来做计数，直到计数满足条件，就生成了目标的字符串。
type RepeactStr<
  Str extends string,
  Count extends number,
  Arr extends Str[] = [],
  ResStr extends string = ''
> = Arr['length'] extends Count ? ResStr : RepeactStr<Str, Count, [Str, ...Arr], `${Str}${ResStr}`>

// 实现简易的 JS Parser，能解析字符串 add(11,22) 的函数名和参数

type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Alphas =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

type TempParseResult<Token extends string, Rest extends string> = {
  token: Token
  rest: Rest
}

type ParseFunctionName<
  SourceStr extends string,
  Res extends string = ''
> = SourceStr extends `${infer PrefixChar}${infer RestStr}`
  ? PrefixChar extends Alphas
    ? ParseFunctionName<RestStr, `${Res}${PrefixChar}`>
    : TempParseResult<Res, SourceStr>
  : never

type Brackets = '(' | ')'
type ParseBrackets<SourceStr> = SourceStr extends `${infer PrefixChar}${infer RestStr}`
  ? PrefixChar extends Brackets
    ? TempParseResult<PrefixChar, RestStr>
    : never
  : never

type ParseNum<
  SourceStr extends string,
  Res extends string = ''
> = SourceStr extends `${infer PrefixChar}${infer RestStr}`
  ? PrefixChar extends Digit
    ? ParseNum<RestStr, `${Res}${PrefixChar}`>
    : TempParseResult<Res, SourceStr>
  : never

type ParseComma<SourceStr extends string> = SourceStr extends `${infer PrefixChar}${infer RestStr}`
  ? PrefixChar extends ','
    ? TempParseResult<',', RestStr>
    : never
  : never

type Parse<SourceStr extends string, Res extends string = ''> = ParseFunctionName<
  SourceStr,
  Res
> extends TempParseResult<infer FunctionName, infer Rest1>
  ? ParseBrackets<Rest1> extends TempParseResult<infer BracketChar, infer Rest2>
    ? ParseNum<Rest2> extends TempParseResult<infer Num1, infer Rest3>
      ? ParseComma<Rest3> extends TempParseResult<infer CommaChar, infer Rest4>
        ? ParseNum<Rest4> extends TempParseResult<infer Num2, infer Rest5>
          ? ParseBrackets<Rest5> extends TempParseResult<infer BracketChar2, infer Rest6>
            ? {
                functionName: FunctionName
                params: [Num1, Num2]
              }
            : never
          : never
        : never
      : never
    : never
  : never

type Res = Parse<'add(11,2)'>
