import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  // the authentication service
  session: service(),

  // the class names to use for the component
  classNames: ['container-fluid', 'bg-primary'],

  // the state of the user dropdown
  showUserDropdown: false,

  // the action to send to
  logout: 'logout',

  actions: {
    /**
     * Sends the logout action to be handled by the application
     * route.
     */
    logout() {
      // hide the dropdown
      this.set('showUserDropdown', false);

      // send action to application route
      this.sendAction('logout');
    }
  }
});
