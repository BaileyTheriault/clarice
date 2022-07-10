const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal,
} = require('discord-modals');
const { gearScoreHelpEmbed } = require('../builders/calculatorEmbeds');
const { attributes } = require('../utils/data');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription(
      'Calculates various in-game systems depending on selected command',
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('gs-calc')
        .setDescription("Calculates a given equipment's gearscore."),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('gs-help')
        .setDescription('Exactly what you think it does.'),
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === 'gs-help') {
      const embed = gearScoreHelpEmbed();
      const response = { ephemeral: true, embeds: [embed] };

      return await interaction.reply(response);
    }

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
          .setCustomId('subs-1')
          .setPlaceholder('First Substat')
          .addOptions(options),
        new SelectMenuComponent()
          .setCustomId('subs-2')
          .setPlaceholder('Second Substat')
          .addOptions(options),
        new SelectMenuComponent()
          .setCustomId('subs-3')
          .setPlaceholder('Third Substat')
          .addOptions(options),
        new SelectMenuComponent()
          .setCustomId('subs-4')
          .setPlaceholder('Fourth Substat')
          .addOptions(options),
        new TextInputComponent()
          .setCustomId('vals')
          .setLabel('Substat Values')
          .setStyle('SHORT')
          .setPlaceholder('Input your substats in order separated by spaces')
          .setRequired(true),
      );

    await showModal(modal, {
      client: client,
      interaction: interaction,
    });
  },
};
