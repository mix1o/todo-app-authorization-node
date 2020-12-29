const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToDoSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: String,
  description: String,
  priority: String,
  complete: {
    type: String,
    default: 'UnCompleted',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('todoLists', ToDoSchema);
