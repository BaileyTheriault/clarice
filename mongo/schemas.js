const { connect, Schema, model } = require('mongoose');
connect('mongodb://localhost:27017/clarice');

const characterSchema = new Schema({
  name: String,
  element: String,
  role: String,
  rarity: Number,
  hp: Number,
  atk: Number,
  def: Number,
  spd: Number,
  crit: Number,
  cdmg: Number,
  acc: Number,
  res: Number,
  ass: Number,
  skill1: {
    name: String,
    cooldown: Number,
    passive: Boolean,
    description: String,
    cost: Number,
    gain: Number,
    upgrades: [String],
  },
  skill2: {
    name: String,
    cooldown: Number,
    passive: Boolean,
    description: String,
    cost: Number,
    gain: Number,
    upgrades: [String],
  },
  skill3: {
    name: String,
    cooldown: Number,
    passive: Boolean,
    description: String,
    cost: Number,
    gain: Number,
    upgrades: [String],
  },
  imprint: String,
  partyImprint: String,
  buffs: [String],
  partyBuffs: [String],
  debuffs: [String],
  specialEq: {
    mainStat: String,
    hp: Number,
    atk: Number,
    skillEffect: String,
  },
});

const Character = model('Character', characterSchema);

module.exports = { Character };
