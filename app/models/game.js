import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  type: attr('string'),
  playedAt: attr('string'),
  scoring: attr('string')
});
