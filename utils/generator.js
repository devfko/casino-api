// const mongoose = require('mongoose');
const modelGenerator = require('../models/generator');
const modelColor = require('../models/color');

async function genTable(name) {
    let ret = await modelGenerator.findOneAndUpdate({ "type": name }, { $inc: { seq: 1 } }, { new: true, upsert: true });

    return ret.seq;
}

async function genBet(color, value) {
    const num = Math.random();

    let arrColors = [];
    let aux = 0;
    let lastIndex = 0;

    arrColors = await modelColor.find({}).sort({ name: 1 });
    lastIndex = arrColors.length - 1;

    for (var i = 0; i <= lastIndex; ++i) {
        aux += (arrColors[i].percentaje / 100);

        if (num < aux) {
            return arrColors[i];
        }

    }

    return arrColors[lastIndex];
}

module.exports = { genTable, genBet };