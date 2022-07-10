const { MessageEmbed } = require('discord.js');

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

module.exports = { gearScoreEmbed, gearScoreHelpEmbed };
