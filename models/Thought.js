const { Schema, model, Types } = require('mongoose');

// Reaction Schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString('en-US'), // Modify as per your locale and formatting needs
  },
}, {
  toJSON: {
    getters: true,
  },
  _id: false, // Prevents creation of an additional _id for the subdocument
});

// Thought Schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString('en-US'), // Modify as per your locale and formatting needs
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Virtual to get the count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;