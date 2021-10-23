import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import Activity from './Activity.js';

// export const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
      maxLength: [50, 'Title can not be more than 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, 'Description can not be more than 500'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    list: {
      type: mongoose.Schema.ObjectId,
      ref: 'List',
      required: true,
    },
    index: {
      type: Number,
    },
  },
  { timestamps: true }
);

CardSchema.pre('remove', async function (next) {
  const activities = await Activity.find({
    card: this._id,
    typeOfActivity: ['added', 'renamed', 'changed', 'moved', 'copied'],
  });
  for (const activity of activities) {
    await activity.remove();
  }
  next();
});

// CardSchema.plugin(AutoIncrement, {
//   id: 'list_seq',
//   inc_field: 'index',
//   reference_fields: ['list'],
// });

export default mongoose.model('Card', CardSchema);
