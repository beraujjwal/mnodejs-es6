'use strict'
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';
import moment from 'moment';

var schema = mongoose.Schema(
  {
    _id: {
      type: String,
      auto: true,
      default: () => uuidv4(),
      trim: true,
      lowercase: true,
    },
    user: {
      type: String,
      ref: 'User',
    },
    token: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    sent_to: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    sent_on: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: moment().utc(process.env.APP_TIMEZONE).toDate(),
      expires: 3600, // this is the expiry time in seconds
    },
  },
  { timestamps: true },
);

schema.plugin(mongoose_delete, { deletedAt: true });

schema.pre('save', async function () {
  let token = this;
  const currentDateTime = moment().utc(process.env.APP_TIMEZONE).toDate();
  token.expiresAt = new Date(currentDateTime + 60 * 60 * 1000);
});

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.v = __v;
  return object;
});
export default mongoose.model('Token', schema);