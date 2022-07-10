const {
  MessageSelectMenu,
  MessageButton,
  MessageActionRow,
} = require('discord.js');

const oneCharButtons = (charaName, mainStat) => {
  const buttonRow = new MessageActionRow();
  const upgradesButton = new MessageButton()
    .setCustomId(`${charaName}-skills`)
    .setLabel('Skill Upgrades')
    .setStyle('SECONDARY');

  buttonRow.addComponents(upgradesButton);

  if (mainStat) {
    const specialEqButton = new MessageButton()
      .setCustomId(`${charaName}-eq`)
      .setLabel('Special Equipment')
      .setStyle('SECONDARY');

    buttonRow.addComponents(specialEqButton);
  }

  return buttonRow;
};

const multipleCharsButtons = (characterData) => {
  const buttonRow = new MessageActionRow();
  const selectOptions = [];

  characterData.forEach((chara) =>
    selectOptions.push({ label: chara.name, value: chara.name }),
  );

  const selectMenu = new MessageSelectMenu()
    .setCustomId('chara-finder')
    .setPlaceholder('Select a character to view their information')
    .addOptions(selectOptions);

  buttonRow.addComponents(selectMenu);

  return buttonRow;
};

const skillsButtons = (charaName, mainStat) => {
  const buttonRow = new MessageActionRow();
  const mainInfoButton = new MessageButton()
    .setCustomId(`${charaName}-home`)
    .setLabel(`${charaName}`)
    .setStyle('PRIMARY');

  buttonRow.addComponents(mainInfoButton);

  if (mainStat) {
    const specialEqButton = new MessageButton()
      .setCustomId(`${charaName}-eq`)
      .setLabel('Special Equipment')
      .setStyle('SECONDARY');

    buttonRow.addComponents(specialEqButton);
  }

  return buttonRow;
};

module.exports = { oneCharButtons, multipleCharsButtons, skillsButtons };
