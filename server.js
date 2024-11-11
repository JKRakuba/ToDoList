// Imported the express module
const express = require('express');
const bodyParser = require('body-parser');

// Initialized the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON data in the body
app.use(bodyParser.json());
app.use(express.static('public'));


//in memmory array to hold todo items
let todos =[];

// Default route: Home page
app.get('/todos', (req, res) => {
    res.json(todos);
});


app.post('/todos', (req, res) => {
    const {id} = req.params;
    const { compeleted } = req.body;
    const todo = todos.find(todo => todo.id == id);
    if (todo) {

        todo.compeleted = completed;
        res.json(todo);
    }else {

        res.status(404).json({ error: 'Todo not found'});
    }
});

app.delete('/todos/:id', (req, res) => {
const { id } = req.params;
todos = todos.filter(todo => todo.id != id);
res.json({ message: 'Todo deleted successfully'});
});

// Port set to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
