import { Photo } from './Photo'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MyBaseEntity } from './MyBaseEntity'

@Entity()
export class PhotoMetadata extends MyBaseEntity {
  @Column({ type: 'text' })
  comment!: string

  // type => Photo显得代码更有可读性
  // typeFunctionOrTarget表示子表的外键关联到哪个模型
  // inverseSide表示查询时对应的另一个表里的字段名
  @OneToOne(type => Photo, photo => photo.metadata, { onDelete: 'CASCADE' })
  // 我们应该仅在子表使用@JoinColumn装饰器
  @JoinColumn()
  photo!: Photo
}
