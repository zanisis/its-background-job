const mongoose = require('mongoose');
var Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {type: String, required : true},
  task : {type : String, required : true},
  status : {type : Boolean, default: false},
  due_date : {type : Date, required : true}
});

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;