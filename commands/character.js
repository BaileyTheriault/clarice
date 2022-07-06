const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('character')
    .setDescription('Returns character information!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
