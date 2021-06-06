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
  entities: ['**/entity/*.ts'],
  synchronize: true,
  logging: ['error', 'warn', 'info'],
})
  .then(async connection => {
    // 这里可以写实体操作相关的代码
    const photoRepository = PhotoService.getPhotoServiceInstance(connection.getRepository(Photo))
    const PhotoMetadataReposity = connection.getRepository(PhotoMetadata)

    // const metadata = new PhotoMetadata()
    // metadata.comment = 'foooooooo'
    // metadata.photo = (await photoRepository.findOneById(1)) as Photo
    // console.log(await PhotoMetadataReposity.save(metadata))
    // console.log(await photoRepository.findOneById(1))
    console.log(await PhotoMetadataReposity.findOne({ id: 1 }, { relations: ['photo'] }))
    console.log(await photoRepository.findByIdWithMetadata(1))
    console.log(await photoRepository.findByIdWithAlbum(1))
  })
  .catch((error: unknown) => console.log(error))
