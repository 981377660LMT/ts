import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Photo } from './entity/Photo'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'a2818088',
  database: 'test',
  entities: [Photo],
  synchronize: true,
  logging: false,
})
  .then(connection => {
    // 这里可以写实体操作相关的代码
    console.log(connection)
  })
  .catch((error: unknown) => console.log(error))
