const Item = require('./item');
const { RangeMinMax } = require('../helpers');

class Conjured extends Item {
  update() {
    this.sellIn -= 1;
    this.quality = RangeMinMax(this.sellIn < 0 ? this.quality - 4 : this.quality - 2);
  }
}
module.exports = Conjured;
