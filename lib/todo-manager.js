module.exports = class TodoManager {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    if (todo) {
      this.todos.push(todo);
    }

    return this;
  }

  getAll() {
    return this.todos;
  }

  getOne(id) {
    if (!id) {
      return null;
    }

    let filteredTodos = this.todos.filter((todo) => todo.id == id);

    if (filteredTodos.length) {
      return filteredTodos[0];
    } else {
      return null;
    }
  }

  removeById(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    return this;
  }

  setDone(id, done) {
    var todo = this.getOne(id);

    if (todo) {
      todo.updatedAt = new Date();
      todo.done = done;
    }
    return this;
  }
};