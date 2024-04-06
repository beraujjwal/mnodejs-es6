'use strict';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

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
    iso3: {
      type: String,
      trim: true,
    },
    iso2: {
      type: String,
      trim: true,
    },
    numericCode: {
      type: String,
      trim: true,
    },
    phoneCode: {
      type: String,
      trim: true,
    },
    capital: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      trim: true,
    },
    currencyName: {
      type: String,
      trim: true,
    },
    currencySymbol: {
      type: String,
      trim: true,
    },
    tld: {
      type: String,
      trim: true,
    },
    native: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    subRegion: {
      type: String,
      trim: true,
    },
    timezones: [
      {
        zoneName: {
          type: String,
          trim: true,
        },
        gmtOffset: {
          type: String,
          trim: true,
        },
        gmtOffsetName: {
          type: String,
          trim: true,
        },
        abbreviation: {
          type: String,
          trim: true,
        },
        tzName: {
          type: String,
          trim: true,
        },
      },
    ],
    latitude: {
      type: String,
      trim: true,
    },
    longitude: {
      type: String,
      trim: true,
    },
    emoji: {
      type: String,
      trim: true,
    },
    emojiU: {
      type: String,
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

export default mongoose.model('Country', schema);