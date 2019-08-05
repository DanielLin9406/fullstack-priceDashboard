const obj2Arr = obj => {
  const skuArr = Object.keys(obj);
  return skuArr;
};

const transFormToObject = arr =>
  arr.reduce((acc, cur, i) => {
    acc[cur.name] = { ...cur };
    return acc;
  }, {});

export default obj2Arr;
export { transFormToObject };
