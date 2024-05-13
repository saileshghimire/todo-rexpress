const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let todos = [];

// let todos = [
//     { id: 1, text: 'Task 1', completed: false },
//     { id: 2, text: 'Task 2', completed: true }
// ];

app.get('/todos',function(req, res){
    res.json(todos);
});

app.use(express.json());

app.post('/todos', function(req, res){
    const newTodo = res.body;
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', function(req, res){
    const id = req.params.id;
    const updateTodo = req.body;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1){
    todos[index] = updateTodo;
    res.json([todos[index]])
    }
    else{
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', function(req,res){
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== id);
    res.sendStatus(204);
});

app.listen(PORT, function(){
    console.log('Server is running on http://localhost:'+PORT);
});
