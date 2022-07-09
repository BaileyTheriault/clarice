const { Character } = require('./schemas');

const findCharacter = async (name, options) => {
  if (name) return await Character.find({ name: new RegExp(name, 'i') });
  const optionsOrder = {
    0: 'debuffs',
    1: 'buffs',
    2: 'partyBuffs',
    3: 'imprint',
    4: 'partyImprint',
  };
  const query = [];

  options.forEach((option, i) =>
    option ? query.push({ [optionsOrder[i]]: option }) : null,
  );

  return await Character.find({ $and: query });
};

module.exports = {
  findCharacter,
};
