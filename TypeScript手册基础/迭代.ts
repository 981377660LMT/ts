let pets = new Set(['Cat', 'Dog', 'Hamster'])

for (let pet in pets) {
  console.log(pet, 1, 2) // "species"
}

for (let pet of pets) {
  console.log(pet) // "Cat", "Dog", "Hamster"
}

console.log(pets.entries())
