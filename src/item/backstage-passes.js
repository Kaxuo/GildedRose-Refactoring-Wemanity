const Item = require('./item');
const { RangeMinMax } = require('../helpers');

class BackStagePasses extends Item {
  updateQuality() {
    switch (true) {
      case this.sellIn < 0:
        return 0;
      case this.sellIn < 5:
        return this.quality + 3;
      case this.sellIn < 10:
        return this.quality + 2;
      default:
        return this.quality + 1;
    }
  }
  update() {
    this.sellIn -= 1;
    this.quality = RangeMinMax(this.updateQuality());
  }
}
module.exports = BackStagePasses;
