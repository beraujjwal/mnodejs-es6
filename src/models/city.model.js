'use strict';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const schema = mongoose.Schema(
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
    state: {
      type: Number,
      ref: 'State',
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
    wikiDataId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

schema.plugin(mongoose_delete, { deletedAt: true });

export default mongoose.model('City', schema);
