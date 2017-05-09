const ObjectId = require('mongoose').ObjectId;
const Todo = require('../models/todo');
const helper = require('../helper/index');

let controllers = {}

controllers.create = (req, res, next)=>{
  var newTodo = Todo()
  newTodo.title = req.body.title,
  newTodo.task = req.body.task,
  newTodo.status = req.body.status,
  newTodo.due_date = req.body.expired

  newTodo.save((err, result)=>{
    console.log(err);
    if(err) throw err
    res.send(result)
  })

  helper(newTodo, req.body.menit)
}

controllers.findById = (req, res, next)=>{
  Todo.findById(req.params.id, (err, result)=>{
    if(err) console.log(err);
    res.send(result)
  })
}

module.exports = controllers;