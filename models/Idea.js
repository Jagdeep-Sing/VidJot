const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA
const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  datails:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

mongoose.model('ideas', IdeaSchema);