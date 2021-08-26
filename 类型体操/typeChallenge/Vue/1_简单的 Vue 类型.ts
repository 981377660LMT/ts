const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    },
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    },
  },
})

export {}

type ComputedReturnType<C> = C extends Record<string, (...args: any[]) => any>
  ? {
      [K in keyof C]: ReturnType<C[K]>
    }
  : never

interface Options<D, C, M> {
  data: () => D
  computed: C
  methods: M
}

// ThisType的作用是：提示其下所定义的函数，在函数body中，其调用者的类型是什么。
// 关键是让thisType正确 this需要指向data函数返回值属性/computed属性/method属性
declare function SimpleVue<D, C, M>(
  // ThisType 是为了保证 options 里的函数的 this 的类型
  options: Options<D, C, M> & ThisType<D & M & ComputedReturnType<C>>
): unknown
