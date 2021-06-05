async function main() {
  const response = await Promise.resolve(() => {})
  console.log(response)
}

main().catch(e => console.error(e))
