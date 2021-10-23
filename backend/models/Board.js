import mongoose from 'mongoose';
import List from './List.js';
import Activity from './Activity.js';

const BoardSchema = new mongoose.Schema(
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
    backgroundImage: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

BoardSchema.pre('remove', async function (next) {
  const lists = await List.find({ board: this._id });
  for (const list of lists) {
    await list.remove();
  }
  next();
});

BoardSchema.pre('remove', async function (next) {
  const activities = await Activity.find({ board: this._id });
  for (const activity of activities) {
    await activity.remove();
  }
  next();
});

export default mongoose.model('Board', BoardSchema);
