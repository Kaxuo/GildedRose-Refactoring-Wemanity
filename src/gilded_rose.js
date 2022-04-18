const { Legendary, BackStagePasses, AgedBries, DefaultItem, Conjured } = require('./item');

class Shop {
  constructor(items = []) {
    this.items = items.map((item) => {
      switch (true) {
        case item.name.includes('Sulfuras'):
          return new Legendary(item.name, item.sellIn, item.quality);
        case item.name.includes('Backstage passes'):
          return new BackStagePasses(item.name, item.sellIn, item.quality);
        case item.name.includes('Aged Brie'):
          return new AgedBries(item.name, item.sellIn, item.quality);
        case item.name.includes('Conjured'):
          return new Conjured(item.name, item.sellIn, item.quality);
        default:
          return new DefaultItem(item.name, item.sellIn, item.quality);
      }
    });
  }
  updateQuality() {
    this.items.forEach((item) => item.update());
    return this.items;
  }
}

module.exports = {
  Shop,
};
