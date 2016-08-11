import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  playedAt: attr('string'),
  scoring: attr('string'),

  rounds: hasMany('round', { async: true })
});
