import Ember from 'ember';

const { isEmpty, inject: { service } } = Ember;

export default Ember.Route.extend({
  // service for notificaions
  flashMessages: service(),
  // service for the authentication
  session: service(),

  /**
   * If user is logged in then redirect to index
   */
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    }
  },

  /**
   * Reset the email and password if the controller
   * is exiting
   * @param  {[type]}  controller [description]
   * @param  {Boolean} isExiting  [description]
   */
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('email', null);
      controller.set('password', null);
    }
  },

  actions: {
    /**
     * Try to authenticate witht he email and password
     */
    authenticate() {
      let data = {
        provider: 'password',
        email: this.controller.get('email').toLowerCase(),
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
        // display error message
        this.get('flashMessages').danger(error.message);
      });
    }
  }
});
