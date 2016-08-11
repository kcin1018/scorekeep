import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  // the authentication service
  session: service(),

  /**
   * If the user is not logged in redirect to login
   */
  beforeModel() {
    return this.get('session').fetch().catch(() => {
      this.transitionTo('login');
    });
  },

  actions: {
    /**
     * Logout out of the users session
     */
    logout() {
      this.get('session').close().then(() => {
        this.transitionTo('login');
      });
    }
  }
});
