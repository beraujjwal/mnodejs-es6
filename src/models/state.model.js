'use strict';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';

let schema = mongoose.Schema(
  {
    _id: {
      type: Number, //String,
      //auto: true,
      //default: () => uuidv4(),
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    stateCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: Number,
      ref: 'Country',
    },
    latitude: {
      type: String,
      required: true,
      trim: true,
    },
    longitude: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true },
);

schema.plugin(mongoose_delete, { deletedAt: true });

export default mongoose.model('State', schema);