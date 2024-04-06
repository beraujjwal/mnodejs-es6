'use strict';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';

const schema = mongoose.Schema(
  {
    _id: {
      type: String,
      auto: true,
      default: () => uuidv4(),
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      index: true,
      slug: "name",
      unique: true,
      slugPaddingSize: 4,
      slugOn: { save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true }
    },
    description: {
      type: String,
      trim: true,
      default: null
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

schema.plugin(mongoose_delete, { deletedAt: true });
schema.plugin(slug);

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.v = __v;
  return object;
});

/*schema.path("_id").validate(function (v) {
      return validator.isUUID(v);
  }, "ID is not a valid GUID: {VALUE}");*/
schema.pre('save', function (next) {
  let permission = this;

  next();
});

schema.pre('update', function (next) {
  next();
});

export default mongoose.model('Permission', schema);