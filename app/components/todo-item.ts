import { set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { tagName, className } from '@ember-decorators/component';
import { alias } from '@ember-decorators/object/computed';

import Repo from 'todomvc/services/repo';
import { Todo } from 'todomvc/todo';
import { KeyboardCode } from 'todomvc/keyboard';
import { Maybe } from 'true-myth';

type InputEvent = KeyboardEvent & { target: HTMLInputElement };

@tagName('li')
export default class TodoItem extends Component {
  onStartEdit!: () => void;
  onEndEdit!: () => void;
  todo!: Todo;

  @service repo!: Repo;

  @className('todo.completed')
  @alias('todo.completed')
  completed!: boolean;

  @className editing = false;

  @action
  startEditing() {
    this.onStartEdit();
    set(this, 'editing', true);
    scheduleOnce('afterRender', this, 'focusInput');
  }

  @action
  doneEditing(todoTitle: string) {
    if (!this.editing) {
      return;
    }

    if (isBlank(todoTitle)) {
      this.send('removeTodo');
    } else {
      set(this.todo, 'title', todoTitle.trim());
      set(this, 'editing', false);
      this.onEndEdit();
    }
  }

  @action
  handleKeydown(e: InputEvent) {
    if (e.code === KeyboardCode.Enter) {
      e.target.blur();
    } else if (e.code === KeyboardCode.Esc) {
      set(this, 'editing', false);
    }
  }

  @action
  toggleCompleted(e: InputEvent) {
    set(this.todo, 'completed', e.target.checked);
    this.repo.persist();
  }

  @action
  removeTodo() {
    this.repo.delete(this.todo);
  }

  focusInput() {
    Maybe.of(this.element.querySelector('input.edit') as HTMLElement).match({
      Just: el => {
        el.focus();
      },
      Nothing: () => {}
    });
  }
}
