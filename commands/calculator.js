const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal,
} = require('discord-modals');
const { attributes } = require('../utils/data');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('Return the gearscore of a given equipment piece.'),
  async execute(interaction, client) {
    let options = [];
    attributes.sort();
    attributes.forEach((atr) =>
      atr !== 'ASS' ? options.push({ label: atr, value: atr }) : null,
    );

    const modal = new Modal()
      .setCustomId('gs-calc')
      .setTitle('Gear Calculator')
      .addComponents(
        new SelectMenuComponent()
          .setCustomId('subs')
          .setPlaceholder('Substats')
          .setMinValues(1)
          .setMaxValues(4)
          .addOptions(options),
        new TextInputComponent()
          .setCustomId('vals')
          .setLabel('Substat Values')
          .setStyle('SHORT')
          .setPlaceholder(
            'Input your substats in the order they appear on the menu',
          )
          .setRequired(true),
      );

    await showModal(modal, {
      client: client,
      interaction: interaction,
    });
  },
};
