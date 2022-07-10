const wait = require('node:timers/promises').setTimeout;
const { findCharacter } = require('../mongo/characterMethods');
const { stringIdentifier } = require('../utils/utils');
const {
  skillsButtons,
  oneCharButtons,
  speqButtons,
} = require('./characterButtons');
const { skillsEmbed, oneCharEmbed, speqEmbed } = require('./characterEmbeds');

const characterButtonsRes = async (interaction) => {
  await interaction.deferUpdate();

  const [name, param] = stringIdentifier(interaction.customId);
  const response = { files: [], components: [] };
  const [charaData] = await findCharacter(name);
  const {
    specialEq: { mainStat },
  } = charaData;
  let embed;
  let buttonRow;

  if (param === 'skills') {
    embed = skillsEmbed(charaData, response);
    buttonRow = skillsButtons(name, mainStat);

    response.embeds = [embed];
    response.components = [buttonRow];

    return await interaction.editReply(response);
  }

  if (param === 'home') {
    embed = oneCharEmbed(charaData, response);
    buttonRow = oneCharButtons(name, mainStat);

    response.embeds = [embed];
    response.components = [buttonRow];

    return await interaction.editReply(response);
  }

  if (param === 'eq') {
    embed = speqEmbed(charaData, response);
    buttonRow = speqButtons(name);

    response.embeds = [embed];
    response.components = [buttonRow];

    return await interaction.editReply(response);
  }
};

module.exports = { characterButtonsRes };
