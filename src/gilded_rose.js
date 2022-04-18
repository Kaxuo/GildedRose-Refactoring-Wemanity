const { Legendary, BackStagePasses, AgedBries } = require('./item');

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name)
        if (this.items[i].name.includes('Sulfuras')) {
          this.items[i] = new Legendary(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
          this.items[i].update();
          continue;
        }
      if (this.items[i].name.includes('Backstage passes')) {
        this.items[i] = new BackStagePasses(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        this.items[i].update();
        continue;
      }
      if (this.items[i].name.includes('Aged Brie')) {
        this.items[i] = new AgedBries(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        this.items[i].update();
        continue;
      }
      if (this.items[i].quality > 0) {
        this.items[i].quality = this.items[i].quality - 1;
      }
      this.items[i].sellIn = this.items[i].sellIn - 1;
      if (this.items[i].sellIn < 0) {
        if (this.items[i].quality > 0) {
          this.items[i].quality = this.items[i].quality - 1;
        }
      }
    }
    return this.items;
  }
}

module.exports = {
  Shop,
};
