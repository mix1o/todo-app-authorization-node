const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToDoSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: String,
  description: String,
  priority: String,
  complete: {
    type: String,
    default: 'Uncompleted',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  finishedDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('todoLists', ToDoSchema);
