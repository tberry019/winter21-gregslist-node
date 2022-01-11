import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class CarsService {
  async getAll() {
    // Note dbContext gives us access to our data schemas, and gives us methods to get and modify our database
    const foundCars = await dbContext.Cars.find().populate('creator', 'name picture')
    return foundCars
  }

  async getById(carId) {
    // NOTE find one
    // const foundCar = await dbContext.Cars.findOne({ _id: carId })
    const foundCar = await dbContext.Cars.findById(carId).populate('creator', 'name picture')
    if (!foundCar) {
      throw new BadRequest('Unable to find car')
    }
    return foundCar
  }

  async create(newCar) {
    const createdCar = await dbContext.Cars.create(newCar)
    return createdCar
  }

  async remove(carId, creatorId) {
    // NOTE grabbing the car to delete, then comparing the creatorId field to the person that is logged in. Works the same way for edits
    const foundCar = await this.getById(carId)
    if (foundCar.creatorId.toString() !== creatorId) {
      throw new BadRequest('Unauthorized to delete')
    }
    await foundCar.remove()
    return foundCar
  }

  async edit(carId, editedCar) {
    const carToEdit = await this.getById(carId)
    if (carToEdit.creatorId.toString() !== editedCar.creatorId) {
      throw new BadRequest('Unauthorized to edit')
    }
    carToEdit.year = editedCar.year || carToEdit.year
    carToEdit.make = editedCar.make || carToEdit.make
    carToEdit.model = editedCar.model || carToEdit.model
    carToEdit.price = editedCar.price || carToEdit.price
    carToEdit.color = editedCar.color || carToEdit.color
    // NOTE we can leave out the fields we do not want to have edited
    // carToEdit.description = editedCar.description || carToEdit.description
    carToEdit.imgUrl = editedCar.imgUrl || carToEdit.imgUrl

    await carToEdit.save()
    return carToEdit
  }
}

export const carsService = new CarsService()
