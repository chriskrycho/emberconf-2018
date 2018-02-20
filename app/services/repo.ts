import Service from '@ember/service';
import { set } from '@ember/object';

import { Maybe } from 'true-myth';

import Todo from '../todo';

export default class Repo extends Service.extend({}) {
  lastId = 0;
  data: Maybe<Todo[]> = Maybe.nothing();

  findAll(): Todo[] {
    return this.data.match({
      Just: data => data,
      Nothing: () => {
        const data = JSON.parse(window.localStorage.getItem('todos') || '[]');
        set(this, 'data', Maybe.just(data));
        return data;
      }
    })
  }

  add(attrs: Todo): Todo {
    const todo = Object.assign({ id: this.incrementProperty('lastId') }, attrs);

    this.data.match({
      Just: data => {
        data.pushObject(todo);
      },
      Nothing: () => {
        set(this, 'data', Maybe.just([todo]));
      }
    });

    this.persist();

    return todo;
  }

  delete(todo: Todo): void {
    this.data.match({
      Just: data => {
        data.removeObject(todo);
      },
      Nothing: () => {
        console.error('Triggered deletion of todo but no todos in storage.');
      }
    });

    this.persist();
  }

  persist(): void {
    this.data.match({
      Just: data => {
        window.localStorage.setItem('todos', JSON.stringify(data));
      },
      Nothing: () => {},
    })
  }
}
