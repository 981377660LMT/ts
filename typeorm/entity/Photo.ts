import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 100 })
  name!: string

  @Column({ type: 'text' })
  description!: string

  @Column()
  filename!: string

  @Column({ type: 'double' })
  views!: number

  @Column()
  isPublished!: boolean
}
