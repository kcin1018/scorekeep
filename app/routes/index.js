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
  },

  /**
   * Fetch all games to display
   */
  model() {
    return this.store.findAll('player');
  },

  /**
   * Initialize the newGame object when route is first
   * entered.
   */
  setupController(controller) {
    this._super(...arguments);

    controller.set('scoreValues', { truthy: 'highest', falsy: 'lowest'})
    controller.set('scoreTexts', { truthy: 'Highest Wins', falsy: 'Lowest Wins'});
    controller.set('newGame', { scoring: 'highest' });
  },

  /**
   * Reset the newGame object when the route is exited.
   */
  resetController(controller, isExiting) {
    if (isExiting) {
      // only reset the game on exit status
      controller.set('newGame', { scoring: 'highest' });
    }
  },

  actions: {
    /**
     * Creates a game object and displays an error or success message
     * on completion.  It will dismiss the create game form on successful
     * completion.
     */
    createGame() {
      // create the game data
      let game = this.store.createRecord('game', this.controller.get('newGame'));

      // save the data to the server
      game.save().then(() => {
        // success, dismiss the form
        this.get('flashMessages').success('Game created');
        this.controller.toggleProperty('showCreateGame');
        this.transitionTo('game.players');
      }, (error) => {
        // failure, display message
        this.get('flashMessages').danger(error.message);
      });
    }
  }
});
