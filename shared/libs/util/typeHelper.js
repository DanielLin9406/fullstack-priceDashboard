/**
 * Converts an object of objects into an array of objects.
 * Useful when transforming map-like structures (by ID) back to arrays for frontend consumption.
 * 
 * @template T
 * @param {Object.<string, T>} promoObj - The object where keys are identifiers and values are the items.
 * @returns {T[]} An array of the values from the input object.
 */
function object2Arr(promoObj) {
  const arr = Object.keys(promoObj).map(ele => {
    return promoObj[ele];
  });
  return arr;
}

export { object2Arr };
