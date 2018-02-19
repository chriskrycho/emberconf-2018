import Service from '@ember/service';

import Todo from '../todo';

export default class Repo extends Service.extend({
  lastId: 0,
  data: null,
  findAll() {
    return this.data || this.set('data', JSON.parse(window.localStorage.getItem('todos') || '[]'));
  },

  add(attrs: Todo) {
    let todo = Object.assign({ id: this.incrementProperty('lastId') }, attrs);
    this.data.pushObject(todo);
    this.persist();
    return todo;
  },

  delete(todo: Todo) {
    this.data.removeObject(todo);
    this.persist();
  },

  persist() {
    window.localStorage.setItem('todos', JSON.stringify(this.data));
  }
}) {}
