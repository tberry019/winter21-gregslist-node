import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from '../db/DbContext'


class HousesService {
  async getAll() {
    const foundHouses = await dbContext.Houses.find().populate('creator', 'name picture')
    return foundHouses
  }
  async getById(houseId) {
    const foundHouse = await dbContext.Houses.findById(houseId).populate('creator', 'name picture')
    if (!foundHouse) {
      throw new BadRequest('Unable to find House')
    }
    return foundHouse
  }
  async create(newHouse) {
    const createdHouse = await dbContext.Houses.create(newHouse)
    return createdHouse
  }
}









export const housesService = new HousesService()