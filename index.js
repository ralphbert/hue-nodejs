const Todo = require('./lib/todo');
const TodoManager = require('./lib/todo-manager');
const express = require('express');
const bodyParser = require('body-parser');

const port = 8080;
const manager = new TodoManager();
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/todos', function (req, res) {
  res.json({
    status: 'ok',
    data: manager.getAll()
  });
});

app.get('/todos/:id', function (req, res) {
  res.json({
    status: 'ok',
    data: manager.getOne(req.params.id)
  });
});

app.post('/todos', function (req, res) {
  let params = req.body;
  console.log('post params: ', params);

  if (params.title) {
    let todo = new Todo(params.title);
    manager.add(todo);
    res.json({
      status: 'ok',
      data: manager.getAll()
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

app.delete('/todos/:id', function (req, res) {
  manager.removeById(req.params.id);
  res.json({
    status: 'ok',
    data: manager.getAll()
  });
});

app.put('/todos/:id/:done', function (req, res) {
  manager.setDone(req.params.id, req.params.done == 'true');
  res.json({
    status: 'ok',
    data: manager.getAll()
  });
});

app.listen(port, function () {
  console.log(`server running - http://localhost:${port}`)
});

// prefill manager with dummy content

[
  'Watch Game Of Thrones Season 7',
  'Buy groceries',
  'Pay rent',
  'Eat some pizza',
  'Watch Game Of Thrones Season 7 again'
].forEach((todoText) => {
  var todo = new Todo(todoText);
  manager.add(todo);
});