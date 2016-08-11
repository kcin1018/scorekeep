import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  game: belongsTo('game', { async: true }),
  number: attr('number'),
  player: belongsTo('player', { async: true }),
  score: attr('number')
});
