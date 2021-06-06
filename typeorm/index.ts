import { PhotoMetadata } from './entity/PhotoMetadata'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Photo } from './entity/Photo'
import { PhotoService } from './utils/photoService'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'a2818088',
  database: 'test',
  entities: ['entity/*.ts'],
  synchronize: true,
  logging: 'all',
})
  .then(async connection => {
    // 这里可以写实体操作相关的代码
    const photoRepository = PhotoService.getPhotoServiceInstance(connection.getRepository(Photo))
    const PhotoMetadataReposity = connection.getRepository(PhotoMetadata)
    const metadata = new PhotoMetadata()
    metadata.comment = 'foooooooo'
    metadata.photo = (await photoRepository.findOneById(2)) as Photo
    console.log(await PhotoMetadataReposity.save(metadata))
  })
  .catch((error: unknown) => console.log(error))
