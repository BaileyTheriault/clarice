const { gearScoreEmbed } = require('../builders/calculatorEmbeds');
const { attributes } = require('../utils/data');

module.exports = {
  name: 'modalSubmit',
  async execute(client, modal) {
    if (modal.customId === 'gs-calc') {
      const vals = modal.getTextInputValue('vals').split(' ');
      const subs = modal.getSelectMenuValues('subs').sort();

      //25% less atk on average
      const atkPer = 0.43;
      const atkMax = 20.3;

      //39% less hp on average
      const hpPer = 0.098;
      const hpMax = 16.5;

      //10% less def on average
      const defPer = 0.58;
      const defMax = 24.3;

      //27gs outliers
      const spdPer = 1.69;
      const critPer = 1.69;
      const cdmgPer = 1.08;

      const gs = [];

      subs.forEach((sub, i) => {
        let num = parseInt(vals[i]);
        switch (sub) {
          case 'ATK':
            let atkPerOfMax = (num * atkPer) / 100;
            gs.push(atkMax * atkPerOfMax);
            break;
          case 'DEF':
            let defPerOfMax = (num * defPer) / 100;
            gs.push(defMax * defPerOfMax);
            break;
          case 'HP':
            let hpPerOfMax = (num * hpPer) / 100;
            gs.push(hpMax * hpPerOfMax);
            break;
          case 'SPD':
            gs.push(num * spdPer);
            break;
          case 'CRIT':
            gs.push(num * critPer);
            break;
          case 'CDMG':
            gs.push(num * cdmgPer);
            break;
          default:
            gs.push(num);
            break;
        }
      });

      const response = {
        embeds: [gearScoreEmbed(subs, vals, gs)],
        ephemeral: true,
      };

      await modal.reply(response);
    }
  },
};
