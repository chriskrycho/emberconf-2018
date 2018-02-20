import { set } from '@ember/object';
import Component from '@ember/component';
import { service } from '@ember-decorators/service';
import { action, computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';

import Repo from '../services/repo';
import Todo from '../todo';

@tagName('section')
export default class TodoList extends Component {
  todos!: Todo[];

  @service repo!: Repo;

  canToggle = true;
  elementId = 'main';

  @computed('todos.@each.completed')
  get allCompleted() {
    return this.todos.isEvery('completed', true);
  }

  @action
  enableToggle() {
    set(this, 'canToggle', true);
  }

  @action
  disableToggle() {
    set(this, 'canToggle', false);
  }

  @action
  toggleAll() {
    const allCompleted = this.allCompleted;
    this.todos.forEach(todo => set(todo, 'completed', !allCompleted));
    this.repo.persist();
  }
}
