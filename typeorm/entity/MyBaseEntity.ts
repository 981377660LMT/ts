import { Column } from 'typeorm'

class MyBaseEntity {
  @Column({ type: 'datetime' })
  createTime!: Date
}
