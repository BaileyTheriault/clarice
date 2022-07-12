const { characterButtonsRes } = require('../builders/characterButtonRes');
const { oneCharButtons } = require('../builders/characterButtons');
const { oneCharEmbed } = require('../builders/characterEmbeds');
const { findCharacter } = require('../mongo/characterMethods');

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
        const { values } = interaction;
        const response = {
          ephemeral: true,
          files: [],
          components: [],
        };
        const [charName] = values;
        const characterData = await findCharacter(charName);
        const [char] = characterData;
        const {
          specialEq: { mainStat },
        } = char;

        embed = oneCharEmbed(char, response);
        buttonRow = oneCharButtons(char.name, mainStat);

        response.components = [buttonRow];
        response.embeds = [embed];

        return interaction.reply(response);
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
