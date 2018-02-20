import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

import Repo from 'todomvc/services/repo';

export default class Application extends Route {
  @service repo!: Repo;

  model() {
    return this.repo.findAll();
  }
}
