import mongoose from 'mongoose';
import Card from './Card.js';
import Activity from './Activity.js';

const ListSchema = new mongoose.Schema(
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
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
      required: true,
    },
    index: {
      type: Number,
    },
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } },
  { timestamps: true }
);

ListSchema.pre('remove', async function (next) {
  await Card.deleteMany({ list: this._id });
  next();
});

ListSchema.pre('remove', async function (next) {
  const activities = await Activity.find({
    list: this._id,
    typeOfActivity: ['added', 'renamed', 'changed', 'moved', 'copied'],
  });
  for (const activity of activities) {
    await activity.remove();
  }
  next();
});

// Reverse populate with virtuals
ListSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'list',
  justOne: false,
});

export default mongoose.model('List', ListSchema);
