const { SlashCommandBuilder } = require('@discordjs/builders');
const characterResponse = require('../builders/characterRes');
const { attributes, debuffs, buffs } = require('../utils/data');

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
    .setDescription(
      'Returns character information! Press enter without any options for help.',
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
        .setDescription('Select a debuff to see what characters can apply it')
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
        .setDescription('Select an attribute to see what characters have it')
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
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const debuff = interaction.options.getString('debuff');
    const buff = interaction.options.getString('buff');
    const partyBuff = interaction.options.getString('party-buff');
    const imprint = interaction.options.getString('imprint');
    const partyImprint = interaction.options.getString('party-imprint');
    const visibility = interaction.options.getBoolean('visibility');

    const res = await characterResponse(
      name,
      debuff,
      buff,
      partyBuff,
      imprint,
      partyImprint,
      visibility,
    );
    await interaction.reply(res);
  },
};
