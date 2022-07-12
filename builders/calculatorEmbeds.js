const { MessageEmbed } = require('discord.js');
const {
  pity: { summonCost, collabPity, normalPity },
} = require('../utils/data');

const gearScoreEmbed = (subs, vals, gs) => {
  let color;
  let totalGs = gs.reduce((a, b) => a + b);

  if (isNaN(totalGs)) {
    const embed = new MessageEmbed()
      .setTitle('You Broke Clarice... Probably')
      .setColor('LUMINOUS_VIVID_PINK')
      .setDescription('Try the help command for gs calculator for... help.')
      .setFooter({
        text: 'gs calculator is a WIP and it might just be broken, sorry.',
      });
    return embed;
  }

  totalGs <= 50
    ? (color = 'AQUA')
    : totalGs <= 75
    ? (color = 'PURPLE')
    : (color = 'GOLD');

  let desStr = `This gear scored **${Math.floor(totalGs)}** out of 108\n`;

  subs.forEach((sub, i) => {
    desStr += `${parseInt(vals[i])} ${sub} \`${Math.floor(gs[i])}\`\n`;
  });

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle('Gear Score')
    .setDescription(desStr);

  return embed;
};

const gearScoreHelpEmbed = () => {
  const embed = new MessageEmbed()
    .setColor('LUMINOUS_VIVID_PINK')
    .setTitle('GearScore Calculator Help')
    .setDescription(
      'This command does not work for mobile users as Discord has not added official support for select menus in modals, *yet.* For non-mobile users the command works by selecting **ALL** substats for your equipment piece and then inputting the values in the order they appear __**separated by spaces.**__ The below screenshot showcases the order for an example.',
    )
    .setImage('https://i.imgur.com/6N9qUNS.png');

  return embed;
};

const pityEmbed = (crystals, tickets) => {
  tickets ? (crystals += tickets * summonCost) : null;
  const regPityCount = ((100 / normalPity) * crystals) / 100;
  const collabPityCount = ((100 / collabPity) * crystals) / 100;
  const regPityStr =
    crystals >= 0 && tickets >= 0
      ? `Currently you have \`${regPityCount.toFixed(2)}\` pities. You need \`${
          Math.ceil((Math.ceil(regPityCount) * normalPity - crystals) / 10) * 10
        }\` more crystals for your next pity.`
      : 'You are in debt.';
  const collabPityStr =
    tickets >= 0 && crystals >= 0
      ? `Currently you have \`${collabPityCount.toFixed(
          2,
        )}\` pities. You need \`${
          Math.ceil((Math.ceil(collabPityCount) * collabPity - crystals) / 10) *
          10
        }\` more crystals for your next pity.`
      : 'You are in debt.';
  const embed = new MessageEmbed()
    .setTitle('Pity Calculator')
    .setColor('LUMINOUS_VIVID_PINK')
    .addFields([
      {
        name: '__Standard__',
        value: regPityStr,
        inline: true,
      },
      {
        name: '__Collab__',
        value: collabPityStr,
        inline: true,
      },
    ]);

  return embed;
};

module.exports = { gearScoreEmbed, gearScoreHelpEmbed, pityEmbed };
