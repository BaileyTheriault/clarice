const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
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
  const embed = new MessageEmbed();
  const buttonRow = new MessageActionRow();
  const response = {
    embeds: [embed],
    ephemeral: !visibility,
    files: [],
    components: [],
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
    const rarityImg = new MessageAttachment(`./assets/icons/${rarity}.png`);
    const roleImg = new MessageAttachment(
      `./assets/icons/${element}_${role}.png`,
    );
    response.files.push(pfpImg, rarityImg, roleImg);

    embed
      .setTitle(name)
      .setColor(elements[element.toUpperCase()])
      .setAuthor({
        iconURL: `attachment://${element}_${role}.png`,
        name: 'Stats & Skills',
      })
      .setThumbnail(`attachment://${name}.png`)
      .setImage(`attachment://${rarity}.png`)
      .addFields(
        { name: '__HP__', value: `${hp}`, inline: true },
        { name: '__ATK__', value: `${atk}`, inline: true },
        { name: '__DEF__', value: `${def}`, inline: true },
        { name: '__SPD__', value: `${spd}`, inline: true },
        { name: '__CRIT__', value: `${crit}%`, inline: true },
        { name: '__CDMG__', value: `${cdmg}%`, inline: true },
        { name: '__ACC__', value: `${acc}%`, inline: true },
        { name: '__RES__', value: `${res}%`, inline: true },
        {
          name: '__Imprint__',
          value: `${imprint} & ${partyImprint}`,
          inline: true,
        },
        { name: `__${skill1.name}__`, value: skill1.description },
        { name: `__${skill2.name}__`, value: skill2.description },
        { name: `__${skill3.name}__`, value: skill3.description },
      );

    const upgradesButton = new MessageButton()
      .setCustomId('milvus-upgrades')
      .setLabel('Skill Upgrades')
      .setStyle('SECONDARY');

    buttonRow.addComponents(upgradesButton);

    if (specialEq.mainStat) {
      const specialEqButton = new MessageButton()
        .setCustomId('milvus-eq')
        .setLabel('Special Equipment')
        .setStyle('SECONDARY');

      buttonRow.addComponents(specialEqButton);
    }

    response.components.push(buttonRow);
  }

  if (characterData.length > 1) {
    let desStr = '';
    let crystalStr = '';
    let moltenStr = '';
    let thunderStr = '';
    const selectOptions = [];

    options.forEach((option, i) => {
      if (option) desStr += `**${optionsOrder[i]}** \`${option}\` `;
    });

    characterData.forEach((chara) => {
      switch (chara.element) {
        case 'Crystal':
          crystalStr += `\`${chara.name}\` `;
          break;
        case 'Molten':
          moltenStr += `\`${chara.name}\` `;
          break;
        case 'Thunder':
          thunderStr += `\`${chara.name}\` `;
          break;
      }
      selectOptions.push({
        label: `${chara.name}`,
        value: `${chara.name}`,
      });
    });

    embed
      .setTitle(`${characterData.length} Characters Found`)
      .setColor('GREEN');

    moltenStr ? embed.addField('__Molten Characters__', moltenStr) : null;
    thunderStr ? embed.addField('__Thunder Characters__', thunderStr) : null;
    crystalStr ? embed.addField('__Crystal Characters__', crystalStr) : null;

    embed.addField('Options', desStr);

    if (characterData.length <= 25) {
      const selectMenu = new MessageSelectMenu()
        .setCustomId('chara-finder')
        .setPlaceholder('Select a character to view their information')
        .addOptions(selectOptions);

      buttonRow.addComponents(selectMenu);
      response.components.push(buttonRow);
    }
  }

  return response;
};

module.exports = characterResponse;