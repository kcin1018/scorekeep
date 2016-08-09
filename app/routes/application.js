import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session').fetch().catch(() => {
      this.transitionTo('login');
    });
  },
});
