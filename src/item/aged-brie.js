const Item = require('./item');
const { RangeMinMax } = require('../helpers');

class AgedBries extends Item {
  updateQuality() {
    return this.sellIn < 0 ? this.quality + 2 : this.quality + 1;
  }
  update() {
    this.sellIn -= 1;
    this.quality = RangeMinMax(this.updateQuality());
  }
}
module.exports = AgedBries;
