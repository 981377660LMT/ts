// 图灵完备

type StringBool = 'true' | 'false'

interface AnyNumber {
  prev?: any
  isZero: StringBool
}

interface PositiveNumber {
  prev: any
  isZero: 'false'
}

type IsZero<TNumber extends AnyNumber> = TNumber['isZero']
type Next<TNumber extends AnyNumber> = { prev: TNumber; isZero: 'false' }
type Prev<TNumber extends PositiveNumber> = TNumber['prev']

type Add<T1 extends AnyNumber, T2> = { true: T2; false: Next<Add<Prev<T1>, T2>> }[IsZero<T1>]

// Computes T1 * T2
type Mult<T1 extends AnyNumber, T2 extends AnyNumber> = MultAcc<T1, T2, _0>
type MultAcc<T1 extends AnyNumber, T2, TAcc extends AnyNumber> = { true: TAcc; false: MultAcc<Prev<T1>, T2, Add<TAcc, T2>> }[IsZero<T1>]

type _0 = { isZero: 'true' }
type _1 = Next<_0>
type _2 = Next<_1>
type _3 = Next<_2>
type _4 = Next<_3>
type _5 = Next<_4>
type _6 = Next<_5>
type _7 = Next<_6>
type _8 = Next<_7>
type _9 = Next<_8>

type Digits = { 0: _0; 1: _1; 2: _2; 3: _3; 4: _4; 5: _5; 6: _6; 7: _7; 8: _8; 9: _9 }
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type NumberToType<TNumber extends Digit> = Digits[TNumber] // I don't know why typescript complains here.

type _10 = Next<_9>
type _100 = Mult<_10, _10>

type Dec2<T2 extends Digit, T1 extends Digit> = Add<Mult<_10, NumberToType<T2>>, NumberToType<T1>>

type Stack = EmptyStack | NonEmptyStack
interface NonEmptyStack {
  prev: any
  isEmpty: 'false'
  item: any
}
interface EmptyStack {
  isEmpty: 'true'
}

type IsEmpty<TStack extends Stack> = TStack['isEmpty']
type Push<TItem, TStack extends Stack> = { prev: TStack; item: TItem; isEmpty: 'false' }
type Peek<TStack extends NonEmptyStack> = TStack['item']
type Pop<TStack extends NonEmptyStack> = TStack['prev']
type PeekOrDefault<TStack extends Stack, TDefault> = {
  true: TDefault
  false: Peek<TStack>
}[IsEmpty<TStack>]
type PopIfNotEmpty<TStack extends Stack> = {
  true: TStack
  false: Pop<TStack>
}[IsEmpty<TStack>]

type TapeLike = { left: Stack; current: any; right: Stack; default: string }
type Left<TTape extends TapeLike> = TTape['left']
type Right<TTape extends TapeLike> = TTape['right']

type ConfigLike<TAutomata> = { state: keyof TAutomata; tape: TapeLike; halt: StringBool }
type AutomataLike = {
  [state: string]: {
    [symbol: string]: InstructionLike
  }
}

type InstructionLike = { write: string; move: 'r' | '_' | 'l'; next: string; halt: StringBool }

type NextConfig<TAutomata extends AutomataLike, TConfig extends ConfigLike<TAutomata>> = NextConfig1<
  TConfig,
  TAutomata[TConfig['state']][TConfig['tape']['current']]
>
type NextConfig1<TConfig extends ConfigLike<any>, TNextInstruction extends InstructionLike> = NextConfig2<
  TConfig['tape'],
  TNextInstruction['write'],
  TNextInstruction
>
type NextConfig2<TTape, TWrite, TNextInstruction extends InstructionLike> = {
  state: TNextInstruction['next']
  halt: TNextInstruction['halt']
  tape: {
    r: {
      left: Push<TWrite, Left<TTape>>
      current: PeekOrDefault<Right<TTape>, TTape['default']>
      right: PopIfNotEmpty<Right<TTape>>
      default: TTape['default']
    }
    _: {
      left: Left<TTape>
      current: TWrite
      right: Right<TTape>
      default: TTape['default']
    }
    l: {
      left: PopIfNotEmpty<Left<TTape>>
      current: PeekOrDefault<Left<TTape>, TTape['default']>
      right: Push<TWrite, Right<TTape>>
      default: TTape['default']
    }
  }[TNextInstruction['move']]
}

type Simplify<T> = { [TKey in keyof T]: T[TKey] }

type Run<TAutomata, TConfig extends { halt: StringBool }, TSteps extends AnyNumber> = {
  true: TConfig
  false: { false: Run<TAutomata, Simplify<NextConfig<TAutomata, TConfig>>, Prev<TSteps>>; true: TConfig }[IsZero<TSteps>]
}[TConfig['halt']]

type RunUnbound<TAutomata, TConfig extends { halt: StringBool }> = {
  true: TConfig
  false: RunUnbound<TAutomata, Simplify<NextConfig<TAutomata, TConfig>>>
}[TConfig['halt']]

type InitialConfig = { state: '0'; halt: 'false'; tape: { left: EmptyStack; current: '0'; right: EmptyStack; default: '0' } }

type BusyBeaver4State = {
  '0': {
    '0': { write: '1'; move: 'r'; next: '1'; halt: 'false' }
    '1': { write: '1'; move: 'l'; next: '1'; halt: 'false' }
  }
  '1': {
    '0': { write: '1'; move: 'l'; next: '0'; halt: 'false' }
    '1': { write: '0'; move: 'l'; next: '2'; halt: 'false' }
  }
  '2': {
    '0': { write: '1'; move: 'r'; next: '2'; halt: 'true' }
    '1': { write: '1'; move: 'l'; next: '3'; halt: 'false' }
  }
  '3': {
    '0': { write: '1'; move: 'r'; next: '3'; halt: 'false' }
    '1': { write: '0'; move: 'r'; next: '0'; halt: 'false' }
  }
}

type S9 = Run<BusyBeaver4State, InitialConfig, _9>
