const Item = require('./item');

class Conjured extends Item {
  updateQuality() {
    let value = 0;
    this.sellIn < 0 ? (value = this.quality - 4) : (value = this.quality - 2);
    value < 0 && (value = 0);
    value > 50 && (value = 50);
    return value;
  }
  update() {
    this.sellIn -= 1;
    this.quality = this.updateQuality();
  }
}
module.exports = Conjured;
