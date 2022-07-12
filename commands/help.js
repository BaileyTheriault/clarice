const { SlashCommandBuilder } = require('@discordjs/builders');
const { gearScoreHelpEmbed } = require('../builders/calculatorEmbeds');
const { charHelpEmbed } = require('../builders/characterEmbeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Does exactly what you think it does.')
    .addStringOption((option) =>
      option
        .setName('command')
        .setDescription('Select the command you need help with.')
        .setRequired(true)
        .addChoices(
          { name: 'calculator', value: 'calculator' },
          { name: 'character', value: 'character' },
        ),
    ),
  async execute(interaction) {
    const command = interaction.options.getString('command');
    const response = { ephemeral: true, embeds: [] };

    if (command === 'character') {
      const embed = charHelpEmbed();
      response.embeds = [embed];

      return await interaction.reply(response);
    }

    if (command === 'calculator') {
      const embed = gearScoreHelpEmbed();
      response.embeds = [embed];

      return await interaction.reply(response);
    }
  },
};
