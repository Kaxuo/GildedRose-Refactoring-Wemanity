const Item = require('./item');

class Legendary extends Item {
  update() {
    this.sellIn = this.sellIn;
    this.quality = this.quality;
  }
}
module.exports = Legendary;
