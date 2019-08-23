function object2Arr(promoObj) {
  const arr = Object.keys(promoObj).map(ele => {
    return promoObj[ele];
  });
  return arr;
}

export { object2Arr };
