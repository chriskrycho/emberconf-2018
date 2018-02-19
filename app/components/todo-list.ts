import { set } from '@ember/object';
import Component from '@ember/component';
import { service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';

import Repo from '../services/repo';
import Todo from '../todo';

export default class TodoList extends Component.extend({
  tagName: 'section',
  elementId: 'main',
  canToggle: true,

  actions: {
    enableToggle(this: TodoList) {
      this.set('canToggle', true);
    },

    disableToggle(this: TodoList) {
      this.set('canToggle', false);
    },

    toggleAll(this: TodoList) {
      let allCompleted = this.allCompleted;
      this.todos.forEach(todo => set(todo, 'completed', !allCompleted));
      this.repo.persist();
    }
  }
}) {
  todos: Todo[];

  @service() repo: Repo;

  @computed('todos.@each.completed')
  get allCompleted() {
    return this.todos.isEvery('completed');
  }
}
