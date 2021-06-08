import { myContainer } from './inversify.config'
import { TYPES, Warrior } from './types'

const ninja = myContainer.get<Warrior>(TYPES.Warrior)
console.log(ninja.fight()) // cut!
console.log(ninja.sneak()) // hit!
