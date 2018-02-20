import Controller from '@ember/controller';
import { filterBy } from '@ember-decorators/object/computed';

import Todo from 'todomvc/todo';

export default class Active extends Controller {
  @filterBy('model', 'completed', false)
  todos!: Todo[];
}
