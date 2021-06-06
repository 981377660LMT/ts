import { PhotoMetadata } from './PhotoMetadata'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
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
}
