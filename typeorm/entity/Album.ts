import { Photo } from './Photo'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { MyBaseEntity } from './MyBaseEntity'

@Entity()
export class Album extends MyBaseEntity {
  @Column({ length: 50 })
  name!: string

  @ManyToMany(type => Photo, photo => photo.albums)
  // 运行后，ORM 将创建album_photos_photo_albums_联结表
  @JoinTable()
  photos!: Photo[]
}
