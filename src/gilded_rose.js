const { Legendary, BackStagePasses, AgedBries, DefaultItem, Conjured } = require('./item');

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
      if (this.items[i].name.includes('Conjured')) {
        this.items[i] = new Conjured(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        this.items[i].update();
        continue;
      }
      this.items[i] = new DefaultItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
      this.items[i].update();
      continue;
    }
    return this.items;
  }
}

module.exports = {
  Shop,
};
