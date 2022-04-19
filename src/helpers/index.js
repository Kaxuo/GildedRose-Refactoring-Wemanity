const RangeMinMax = (number) => {
  let maxQuality = 50;
  let minQuality = 0;
  switch (true) {
    case number > maxQuality:
      return maxQuality;
    case number < minQuality:
      return minQuality;
    default:
      return number;
  }
};
module.exports = { RangeMinMax };
