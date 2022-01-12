import { RESERVED_EVENTS } from "socket.io/dist/socket"
import { housesService } from "../services/HousesService"
import BaseController from '../utils/BaseController'
export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }
  async getAll(req, res, next) {
    try {
      const houses = await housesService.getAll()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const houses = await housesService.getById(req.params.id)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = res.userInfo.id
      const createdHouse = await housesService.create(req.body)
      res.send(createdHouse)
    } catch (error) {
      next(error)
    }
  }
}
