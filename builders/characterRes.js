const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
} = require('discord.js');
const { findCharacter } = require('../mongo/characterMethods');
const { elements } = require('../utils/data');

const characterResponse = async (
  name,
  debuff,
  buff,
  partyBuff,
  imprint,
  partyImprint,
  visibility,
) => {
  console.log(visibility);
  const embed = new MessageEmbed();
  const response = {
    embeds: [embed],
    ephemeral: !visibility,
    files: [],
  };

  if (!name && !debuff && !buff && !partyBuff && !imprint && !partyImprint) {
    embed
      .setTitle('/character Command Help')
      .setColor('LUMINOUS_VIVID_PINK')
      .setDescription(
        `Clarice can help find characters given the following options: \`name\`, \`debuff\`, \`buff\`, \`party-buff\`, \`imprint\`, and \`party-imprint\`. You can apply **one** to **all** filters to search for a character. Not providing any options will bring you here. \n\nYou can apply these filters to your search using the options that appear while using the \`/character\` command.\n\nBy default messages sent using the \`/character\` command will be private. The \`visibility\` option can be set to **true** for Clarice to publically post to the channel the command was used in.`,
      );

    return response;
  }

  const characterData = await findCharacter(name, [
    debuff,
    buff,
    partyBuff,
    imprint,
    partyImprint,
  ]);
  const options = [name, debuff, buff, partyBuff, imprint, partyImprint];
  const optionsOrder = {
    0: 'name',
    1: 'debuff',
    2: 'buff',
    3: 'party-buff',
    4: 'imprint',
    5: 'party-imprint',
  };

  if (characterData.length === 0) {
    let optionStr = '';

    options.forEach((option, i) => {
      if (option) optionStr += `\n**${optionsOrder[i]}** \`${option}\``;
    });

    const desStr = `No characters found with the options:${optionStr}`;
    embed
      .setTitle('No Results')
      .setColor('LUMINOUS_VIVID_PINK')
      .setDescription(desStr);
  }

  if (characterData.length === 1) {
    const {
      name,
      element,
      role,
      rarity,
      hp,
      atk,
      def,
      spd,
      crit,
      cdmg,
      acc,
      res,
      ass,
      skill1,
      skill2,
      skill3,
      imprint,
      partyImprint,
      buffs,
      partyBuffs,
      debuffs,
      specialEq,
    } = characterData[0];

    const pfpImg = new MessageAttachment(`./assets/avatars/${name}.png`);
    response.files.push(pfpImg);

    embed
      .setTitle(name)
      .setColor(elements[element.toUpperCase()])
      .setThumbnail(`attachment://${name}.png`);
  }

  if (characterData.length > 1) {
  }

  const buttons = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('prev')
      .setLabel('Prev')
      .setStyle('SECONDARY'),
    new MessageButton()
      .setCustomId('next')
      .setLabel('Next')
      .setStyle('PRIMARY'),
  );

  return response;
};

module.exports = characterResponse;
