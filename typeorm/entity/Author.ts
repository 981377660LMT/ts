import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MyBaseEntity } from './MyBaseEntity'
import { Photo } from './Photo'

@Entity()
export class Author extends MyBaseEntity {
  @Column({ length: 20 })
  name!: string

  @OneToMany(type => Photo, photo => photo.author) // note: we will create author property in the Photo class below
  photos!: Photo[]
}
