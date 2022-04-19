const { Shop } = require('../src/gilded_rose');
const { Item } = require('../src/item');
describe('Gilded Rose', () => {
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
    it('Increases Quality instead of lowering it', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });
    it('Increases Quality by 2 instead of 1 when sellIn is 0 or lower', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });
    it('Increases in Quality the older it gets in the span of 50 days but never above 50', () => {
      let prevQuality = 0;
      const gildedRose = new Shop([new Item('Aged Brie', 2, 0)]);
      for (let day = 0; day < 50; day++) {
        const items = gildedRose.updateQuality();
        let expectedResult =
          (items[0].sellIn >= 0 && items[0].quality <= 50 && items[0].quality == prevQuality + 1) ||
          (items[0].sellIn < 0 && items[0].quality <= 50 && items[0].quality == prevQuality + 2) ||
          items[0].quality == 50;
        expect(expectedResult).toBe(true);
        prevQuality = items[0].quality;
      }
    });
  });

  describe('Sulfurus (Legendary Item)', () => {
    it('Quality and SellIn do not change', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80), new Item('Sulfuras, Hand of Ragnaros', -1, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
      expect(items[1].sellIn).toBe(-1);
      expect(items[1].quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    it('Increases in Quality as its SellIn value gets closer to 0', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(11);
    });
    it('Increases Quality by 2 if SellIn is 10 or lower', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(12);
    });
    it('Increases Quality by 3 if SellIn is 5 or lower', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(13);
    });
    it('drops to 0 Quality after the concert', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    it('All Of the Above but in the span of 45 days', () => {
      let prevQuality = 40;
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 40, prevQuality)]);
      for (let day = 0; day < 45; day++) {
        const items = gildedRose.updateQuality();
        let expectedResult =
          (items[0].sellIn >= 10 && items[0].quality == prevQuality + 1) ||
          (items[0].sellIn >= 5 && items[0].quality == prevQuality + 2 && items[0].sellIn < 10) ||
          (items[0].sellIn <= 5 && items[0].quality == prevQuality + 3) ||
          items[0].quality == 0 ||
          items[0].quality == 50;
        expect(expectedResult).toBe(true);
        prevQuality = items[0].quality;
      }
    });
  });

  describe('Conjured Items', () => {
    it('Quality decreases twice as fast as normal items', () => {
      const gildedRose = new Shop([new Item('Conjured Mana Cake', 3, 6), new Item('Conjured Mana Cake', 0, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(4);
      expect(items[1].sellIn).toBe(-1);
      expect(items[1].quality).toBe(2);
    });
  });

  describe('Multiple Items', () => {
    it('should return the correct result after 16 days', () => {
      const storeItems = [
        new Item('+5 Dexterity Vest', 10, 20),
        new Item('Aged Brie', 2, 0),
        new Item('Elixir of the Mongoose', 5, 7),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      ];
      const gildedRose = new Shop(storeItems);
      let items = [];
      for (let day = 0; day < 16; day++) {
        items = gildedRose.updateQuality();
      }
      expect(items).toEqual([
        new Item('+5 Dexterity Vest', -6, 0),
        new Item('Aged Brie', -14, 30),
        new Item('Elixir of the Mongoose', -11, 0),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0),
      ]);
    });
  });
});
