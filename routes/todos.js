var express = require('express');
var router = express.Router();

const todos = [{
    id : 1,
    name : 'Do Something',
    completed : false
}]

function todos_validator (req, res, next) {
    if (req.body.name) {
        console.log('name is present')
        next()
    } else {
        res.status(422).json({
            message : 'Please provide a name for the todo.'
        })
    }
}

router.get("/:id?", function(req, res, next) {
    console.log('req.params.id', req.params.id)
    if (typeof(req.params.id) === "undefined") {
        return res.status(200).json(todos)
    }
    const id = parseInt(req.params.id);
    if(typeof(todos[id]) === "undefined"){
        return res.status(404).json({
            message : "Todo not found."
        })
    } else {
        res.status(200).json(todos[id])
    }
})

router.post("/", todos_validator, function(req, res){
    const newTodo = {
        id : todos.length,
        name : req.body.name,
        completed : false
    }
    todos.push(newTodo)
    res.status(201).json({
        message : "Successfully created a todo.",
        result : newTodo
    })
})

module.exports = router;