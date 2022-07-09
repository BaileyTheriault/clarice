const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  Modal,
  MessageActionRow,
  TextInputComponent,
  MessageSelectMenu,
} = require('discord.js');
const { attributes } = require('../utils/data');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('Return the gearscore of a given equipment piece.'),
  async execute(interaction) {
    const modal = new Modal().setCustomId('gsCalc').setTitle('Gear Calculator');

    let options = [];
    attributes.forEach((atr) => options.push({ label: atr, value: atr }));

    const subOneSelect = new MessageSelectMenu()
      .setCustomId('subOneSelect')
      .setPlaceholder('Substat')
      .setMinValues(1)
      .setMaxValues(4)
      .addOptions(options);

    const subOneInput = new TextInputComponent()
      .setCustomId('subOneInput')
      .setLabel('Value')
      .setStyle('SHORT');

    // const subTwoInput = new TextInputComponent()
    //   .setCustomId('subTwoInput')
    //   .setLabel('Value')
    //   .setStyle('SHORT');

    const firstActionRow = new MessageActionRow().addComponents(subOneSelect);
    const secondActionRow = new MessageActionRow().addComponents(subOneInput);

    modal.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(modal);
  },
};
