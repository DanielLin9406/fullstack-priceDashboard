export default obj => {
  const skuArr = Object.keys(obj);
  return skuArr;
};

const transFormToObject = arr =>
  arr.reduce(function(acc, cur, i) {
    acc[cur.name] = { ...cur };
    return acc;
  }, {});

export { transFormToObject };
