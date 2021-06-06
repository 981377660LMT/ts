import { Album } from './Album'
import { Author } from './Author'
import { PhotoMetadata } from './PhotoMetadata'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany } from 'typeorm'
import { MyBaseEntity } from './MyBaseEntity'

@Entity()
export class Photo extends MyBaseEntity {
  @Column({ length: 100 })
  name!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ length: 100 })
  filename!: string

  @Column({ type: 'double' })
  views!: number

  @Column()
  isPublished!: boolean

  @OneToOne(type => PhotoMetadata, PhotoMetadata => PhotoMetadata.photo)
  metadata!: PhotoMetadata

  @ManyToOne(type => Author, author => author.photos, { onDelete: 'SET NULL' })
  author!: Author

  @ManyToMany(type => Album, album => album.photos)
  albums!: Album[]
}
