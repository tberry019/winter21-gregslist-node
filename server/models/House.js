import { Schema } from "mongoose";

export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true, default: '//placehold.it/300x300' },
    description: { type: String, minLength: 3 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

HouseSchema.virtual('creator', {
  // localfield is the property on this local table we want to match
  localField: 'creatorId',
  // foreignfield is the property on a foreign table we want to match to our localfield
  foreignField: '_id',
  // ref is what schema we want to have populated onto 'creator'
  ref: 'Profile',
  justOne: true

})