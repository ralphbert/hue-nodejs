let id = 1;

module.exports = class Todo {
  constructor(title) {
    this.id = id++;
    this.title = title;
    this.done = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  setDone(done) {
    this.done = done;
    this.updatedAt = new Date();
  }
};