import { isBlank } from '@ember/utils';
import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { filterBy, filter } from '@ember-decorators/object/computed';

import Repo from 'todomvc/services/repo';
import Todo from 'todomvc/todo';
import { KeyboardCode } from 'todomvc/keyboard';

type InputEvent = KeyboardEvent & { target: HTMLInputElement };

export default class Application extends Controller {
  model!: Todo[];

  @service repo!: Repo;

  @filterBy('model', 'completed', false)
  remaining!: Todo[];

  @filterBy('model', 'completed')
  completed!: Todo[];

  @action
  createTodo(e: InputEvent) {
    if (e.code === KeyboardCode.Enter && !isBlank(e.target.value)) {
      this.repo.add({ title: e.target.value.trim(), completed: false });
      e.target.value = '';
    }
  }

  @action
  clearCompleted() {
    this.model.removeObjects(this.completed);
    this.repo.persist();
  }
}
