'use strict';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';

const right = new mongoose.Schema(
    {
      resource: {
        type: String,
        ref: 'Resource',
      },
      listView: { type: Boolean, default: false },
      singleDetailsView: { type: Boolean, default: false },
      fullAccess: { type: Boolean, default: false },
      createNew: { type: Boolean, default: false },
      updateExisting: { type: Boolean, default: false },
      deleteExisting: { type: Boolean, default: false },
      downloadList: { type: Boolean, default: false },
      downloadSingleDetails: { type: Boolean, default: false },
      dropDownList: { type: Boolean, default: false },
      manageColumns: { type: Boolean, default: false },
      others: { type: Boolean, default: false },
      fullDeny: { type: Boolean, default: false },
    }
);

export default  right