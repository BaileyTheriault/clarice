const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { findCharacter } = require('../mongo/characterMethods');
const { attributes, debuffs, buffs, elements } = require('../utils/data');
const {
  oneCharButtons,
  multipleCharsButtons,
} = require('../builders/characterButtons');
const {
  charHelpEmbed,
  noCharEmbed,
  oneCharEmbed,
  multipleCharsEmbed,
} = require('../builders/characterEmbeds');

const attributeOptions = [];
const debuffOptions = [];
const buffOptions = [];

attributes.forEach((attribute) =>
  attributeOptions.push({ name: attribute, value: attribute }),
);
debuffs.forEach((debuff) =>
  debuffOptions.push({ name: debuff, value: debuff }),
);
buffs.forEach((buff) => buffOptions.push({ name: buff, value: buff }));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('character')
    .setDescription('Returns character information!')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('search')
        .setDescription(
          'Searches for a character matching the user provided options.',
        )
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription(
              'Enter a character name to see their stats, skills, imprint, rarity, and unique equipment',
            ),
        )
        .addStringOption((option) =>
          option
            .setName('debuff')
            .setDescription(
              'Select a debuff to see what characters can apply it',
            )
            .setChoices(...debuffOptions),
        )
        .addStringOption((option) =>
          option
            .setName('buff')
            .setDescription('Select a buff to see what characters can apply it')
            .setChoices(...buffOptions),
        )
        .addStringOption((option) =>
          option
            .setName('party-buff')
            .setDescription(
              'Select a buff to see what characters can apply it to party members',
            )
            .setChoices(...buffOptions),
        )
        .addStringOption((option) =>
          option
            .setName('imprint')
            .setDescription(
              'Select an attribute to see what characters have it',
            )
            .setChoices(...attributeOptions),
        )
        .addStringOption((option) =>
          option
            .setName('party-imprint')
            .setDescription(
              'Select an attribute to see what characters have it as a party imprint',
            )
            .addChoices(...attributeOptions),
        )
        .addBooleanOption((option) =>
          option
            .setName('visibility')
            .setDescription(
              'Display the result message privately (false) or publically (true)',
            ),
        ),
    ),
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const debuff = interaction.options.getString('debuff');
    const buff = interaction.options.getString('buff');
    const partyBuff = interaction.options.getString('party-buff');
    const imprint = interaction.options.getString('imprint');
    const partyImprint = interaction.options.getString('party-imprint');
    const visibility = interaction.options.getBoolean('visibility');

    let embed;
    let buttonRow;
    const response = {
      ephemeral: !visibility,
      files: [],
      components: [],
    };

    if (!name && !debuff && !buff && !partyBuff && !imprint && !partyImprint) {
      embed = charHelpEmbed();
      response.embeds = [embed];

      return interaction.reply(response);
    }

    const characterData = await findCharacter(name, [
      debuff,
      buff,
      partyBuff,
      imprint,
      partyImprint,
    ]);

    if (characterData.length === 0) {
      embed = noCharEmbed(name, debuff, buff, partyBuff, imprint, partyImprint);
      response.embeds = [embed];

      return interaction.reply(response);
    }

    if (characterData.length === 1) {
      const [char] = characterData;
      const {
        specialEq: { mainStat },
      } = char;

      embed = oneCharEmbed(char, response);
      buttonRow = oneCharButtons(char.name, mainStat);

      response.components = [buttonRow];
      response.embeds = [embed];

      return interaction.reply(response);
    }

    if (characterData.length > 1) {
      embed = multipleCharsEmbed(
        [name, debuff, buff, partyBuff, imprint, partyImprint],
        characterData,
      );
      response.embeds = [embed];

      if (characterData.length <= 25) {
        buttonRow = multipleCharsButtons(characterData, response);
        response.components = [buttonRow];
      }

      return interaction.reply(response);
    }
  },
};
