import Ember from 'ember';

const { isEmpty, inject: { service } } = Ember;

export default Ember.Route.extend({
  flashMessages: service(),
  session: service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    }
  },

  actions: {
    authenticate: function() {
      let data = {
        provider: 'password',
        email: this.controller.get('email'),
        password: this.controller.get('password')
      };

      // make sure the email and password is set
      if (isEmpty(data.email) || isEmpty(data.password)) {
        this.get('flashMessages').danger('Please enter an email and password to login');
        return;
      }

      // try to authenticate
      this.get('session').open('firebase', data).then(() => {
        this.transitionTo('index');
      }).catch((error) => {
        this.get('flashMessages').danger(error.message);
      });
    }
  }
});
