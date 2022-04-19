const Item = require('./item');
const { RangeMinMax } = require('../helpers');

class Conjured extends Item {
  updateQuality() {
    return this.sellIn < 0 ? this.quality - 4 : this.quality - 2;
  }
  update() {
    this.sellIn -= 1;
    this.quality = RangeMinMax(this.updateQuality());
  }
}
module.exports = Conjured;
