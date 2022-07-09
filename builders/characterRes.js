const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
} = require('discord.js');
const { findCharacter } = require('../mongo/characterMethods');
const { elements } = require('../utils/data');
const { oneCharButtons, multipleCharsButtons } = require('./characterButtons');
const {
  charHelpEmbed,
  noCharEmbed,
  oneCharEmbed,
  multipleCharsEmbed,
} = require('./characterEmbeds');

const characterResponse = async (
  name,
  debuff,
  buff,
  partyBuff,
  imprint,
  partyImprint,
  visibility,
) => {
  let embed;
  let buttonRow;
  const response = {
    ephemeral: !visibility,
    files: [],
    components: [],
  };

  if (!name && !debuff && !buff && !partyBuff && !imprint && !partyImprint) {
    embed = charHelpEmbed();
    response.embeds = [embed];

    return response;
  }

  const characterData = await findCharacter(name, [
    debuff,
    buff,
    partyBuff,
    imprint,
    partyImprint,
  ]);

  if (characterData.length === 0) {
    embed = noCharEmbed(name, debuff, buff, partyBuff, imprint, partyImprint);
    response.embeds = [embed];

    return response;
  }

  if (characterData.length === 1) {
    const [char] = characterData;
    const {
      specialEq: { mainStat },
    } = char;

    embed = oneCharEmbed(char, response);
    buttonRow = oneCharButtons(mainStat);

    response.components = [buttonRow];
    response.embeds = [embed];

    return response;
  }

  if (characterData.length > 1) {
    embed = multipleCharsEmbed(
      [name, debuff, buff, partyBuff, imprint, partyImprint],
      characterData,
    );
    response.embeds = [embed];

    if (characterData.length <= 25) {
      buttonRow = multipleCharsButtons(characterData, response);
      response.components = [buttonRow];
    }

    return response;
  }
};

module.exports = characterResponse;
