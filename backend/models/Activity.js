import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
      enum: ['board', 'list', 'card'],
    },
    typeOfActivity: {
      type: String,
      required: true,
      enum: ['added', 'renamed', 'changed', 'deleted', 'moved', 'copied'],
    },
    valueOfActivity: {
      type: String,
      required: true,
      trim: true,
      previousPropertyValue: {
        type: String,
        trim: true,
      },
    },
    propertyChanged: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
    },
    destination: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
    },
    list: {
      type: mongoose.Schema.ObjectId,
      ref: 'List',
    },
    card: {
      type: mongoose.Schema.ObjectId,
      ref: 'Card',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Activity', ActivitySchema);
