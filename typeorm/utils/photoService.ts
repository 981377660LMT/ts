import { Repository } from 'typeorm'
import { Photo } from '../entity/Photo'

const photo = new Photo()

photo.name = 'Me and Bears'
photo.description = 'I am near polar bears'
photo.filename = 'photo-with-bears.jpg'
photo.views = 1
photo.isPublished = true

// 当你经常处理实体时，Repositories 比 EntityManagers 更方便使用
class PhotoService {
  private static instance: PhotoService
  static getPhotoServiceInstance(photoRepository: Repository<Photo>) {
    return this.instance || new PhotoService(photoRepository)
  }

  private constructor(private readonly photoRepository: Repository<Photo>) {}

  // list
  async findAll() {
    return await this.photoRepository.findAndCount()
  }

  // get
  async findOneById(id: number) {
    return await this.photoRepository.findOne({ id })
  }

  // post
  async createOne(photo: Photo) {
    return await this.photoRepository.save(photo)
  }

  // patch
  async updateOne(particalPhoto: Partial<Photo>) {
    return await this.photoRepository.save({ ...particalPhoto })
  }

  // delete
  async deleteOneById(id: number) {
    return await (
      await this.photoRepository.delete({ id })
    ).affected
  }
}

export { PhotoService }
