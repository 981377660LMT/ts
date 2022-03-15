// async function main() {
//   const response = await Promise.resolve(() => {})
//   console.log(response)
// }

// main().catch(e => console.error(e))
class C {
  p = 12
  m = () => {}
}
let c = new C()
let clone = { ...c }
console.log(clone)
