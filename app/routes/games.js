import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  // the authentication service
  session: service(),

  /**
   * Make sure that a user is logged in
   */
  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('login');
    }
  }
});
