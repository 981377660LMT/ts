import { Photo } from './Photo'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text' })
  comment!: string

  // type => Photo显得代码更有可读性
  // typeFunctionOrTarget表示子表的外键关联到哪个模型
  // inverseSide表示查询父表时可以查出子表的哪个字段
  @OneToOne(type => Photo, { onDelete: 'CASCADE' })
  @JoinColumn()
  photo!: Photo
}
