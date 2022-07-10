const { MessageEmbed } = require('discord.js');

const gearScoreEmbed = (subs, vals, gs) => {
  let color;
  let totalGs = gs.reduce((a, b) => a + b);

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

module.exports = { gearScoreEmbed };
