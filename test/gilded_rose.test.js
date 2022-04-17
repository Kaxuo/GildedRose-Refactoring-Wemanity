const { Shop, Item } = require('../src/gilded_rose');
describe('Gilded Rose', function () {
  describe('General Functionalities', () => {
    it('Decreases sellIn and Quality by 1 by default if SellIn is above 0', () => {
      const gildedRose = new Shop([new Item('Default', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });
    it('Decreases Quality by 2 if SellIn is 0 or lower', () => {
      const gildedRose = new Shop([new Item('Default', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });
    it('Quality of an item is never negative', () => {
      const gildedRose = new Shop([new Item('Default', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
    it('Quality of an item is never more than 50', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Aged Brie', () => {
    it('Increases Quality by 2 instead of 1 when sellIn is 0 or lower', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });
    it('Increases in Quality the older it gets but never above 50', () => {
      let prevQuality = 0;
      const gildedRose = new Shop([new Item('Aged Brie', 2, 0)]);
      for (let day = 0; day < 50; day++) {
        const items = gildedRose.updateQuality();
        let expectedResult = items[0].quality > prevQuality || items[0].quality === 50;
        expect(expectedResult).toBe(true);
        prevQuality = items[0].quality;
      }
    });
  });
});
