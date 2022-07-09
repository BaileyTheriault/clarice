const {
  MessageSelectMenu,
  MessageButton,
  MessageActionRow,
} = require('discord.js');

const oneCharButtons = (mainStat) => {
  const buttonRow = new MessageActionRow();
  const upgradesButton = new MessageButton()
    .setCustomId('milvus-upgrades')
    .setLabel('Skill Upgrades')
    .setStyle('SECONDARY');

  buttonRow.addComponents(upgradesButton);

  if (mainStat) {
    const specialEqButton = new MessageButton()
      .setCustomId('special-eq')
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

module.exports = { oneCharButtons, multipleCharsButtons };
