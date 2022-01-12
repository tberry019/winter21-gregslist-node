import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { ValueSchema } from '../models/Value'
import { HouseSchema } from '../models/House'

// NOTE this is where we want to register our Schemas, so that we can reference them when we populate data, or access the database

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Cars = mongoose.model('Car', CarSchema)

  Houses = mongoose.model('House', HouseSchema)

}

export const dbContext = new DbContext()
