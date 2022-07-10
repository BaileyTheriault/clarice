const { characterButtonsRes } = require('../builders/characterButtonRes');
const characterResponse = require('../builders/characterRes');

module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
    if (interaction.isButton()) {
      try {
        return await characterButtonsRes(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }

    if (interaction.isSelectMenu()) {
      try {
        const { ephemeral, values } = interaction;
        const [charName] = values;
        return await characterResponse(
          charName,
          null,
          null,
          null,
          null,
          null,
          ephemeral,
          interaction,
        );
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};
