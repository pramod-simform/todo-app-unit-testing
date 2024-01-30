const mongoose = require('mongoose');

const Todo = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    is_completed: Boolean,
    created_date: Date,
    updated_date: Date,
  },
  { versionKey: false, validateBeforeSave: true },
);

module.exports = mongoose.model('todos', Todo);
