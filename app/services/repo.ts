import Service from '@ember/service';
import { set } from '@ember/object';

import Todo from '../todo';

export default class Repo extends Service.extend({}) {
  lastId = 0;
  data: Todo[] = JSON.parse(window.localStorage.getItem('todos') || '[]');

  findAll(): Todo[] {
    return this.data;
  }

  add(attrs: Todo): Todo {
    let todo = Object.assign({ id: this.incrementProperty('lastId') }, attrs);
    this.data.pushObject(todo);
    this.persist();
    return todo;
  }

  delete(todo: Todo): void {
    this.data.removeObject(todo);
    this.persist();
  }

  persist(): void {
    window.localStorage.setItem('todos', JSON.stringify(this.data));
  }
}
