const Item = require('./item');

class AgedBries extends Item {
  updateQuality() {
    let value = 0;
    this.sellIn < 0 ? (value = this.quality + 2) : (value = this.quality + 1);
    value > 50 && (value = 50);
    return value;
  }
  update() {
    this.sellIn -= 1;
    this.quality = this.updateQuality();
  }
}
module.exports = AgedBries;
