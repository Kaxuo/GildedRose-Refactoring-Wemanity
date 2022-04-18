const Item = require('./item');

class Conjured extends Item {
  update() {
    this.sellIn = this.sellIn;
    this.quality = this.quality;
  }
}
module.exports = Conjured;
