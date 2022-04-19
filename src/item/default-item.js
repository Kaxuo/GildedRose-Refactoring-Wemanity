const Item = require('./item');
const { RangeMinMax } = require('../helpers');

class DefaultItem extends Item {
  update() {
    this.sellIn -= 1;
    this.quality = RangeMinMax(this.sellIn < 0 ? this.quality - 2 : this.quality - 1);
  }
}
module.exports = DefaultItem;
