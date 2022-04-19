# Gilded Rose

This is my solution for the refactoring of the "Gilded Rose Kata"

## Getting started

- Clone the repository

- Install dependencies

```sh
npm install
```

## Run the application

- texttest_fixture.js file will be used

- You can freely change the values of the items or the number of days in that specific file

```sh
node test/texttest_fixture.js
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

## The Problem

A list of items have their own "SellIn" and "Quality" value

- SellIn : value which denotes the number of days the item needs to be sold
- Quality : value which denotes how valuable the item is

At the end of each day, SellIn and Quality drop by one but The quality can never be higher than 50 or lower than 0 (except legendary items)
If the SellIn drops below 0, then the Quality drops by 2 instead of 1

However some specific items have different rules

- Aged Brie" actually increases in Quality the older it gets
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  Quality drops to 0 after the concert
- "Conjured" items degrade in Quality twice as fast as normal items

To fit all those requirements, different classes of item have been created with their own "update" method which will change the quality depending on the type of item it is.
All Tests pass.
If there are new items that need to be classified, it is possible to put them in one of those categories, or even create a new one.
