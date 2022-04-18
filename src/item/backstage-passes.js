const Item = require('./item');

class BackStagePasses extends Item {
  updateQuality() {
    switch (true) {
      case this.sellIn < 0:
        this.quality = 0;
        break;
      case this.sellIn < 5:
        this.quality = this.quality + 3 <= 50 ? this.quality + 3 : 50;
        break;
      case this.sellIn < 10:
        this.quality = this.quality + 2 <= 50 ? this.quality + 2 : 50;
        break;
      default:
        this.quality = this.quality + 1 <= 50 ? this.quality + 1 : 50;
    }
  }
  update() {
    this.sellIn -= 1;
    this.updateQuality();
  }
}
module.exports = BackStagePasses;
