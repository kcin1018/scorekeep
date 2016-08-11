import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-boolean'],

  texts: {
    falsy: 'No',
    truthy: 'Yes'
  },

  values:  {
    falsy: 0,
    truthy: 1
  },

  actions: {
    select(id) {
      this.set('data', this.get(`values.${id}`));
    }
  }
});
