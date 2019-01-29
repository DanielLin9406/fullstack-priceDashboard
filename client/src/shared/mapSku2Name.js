const buildMapSkuToName = (prdArr = []) => {
  const mapObj = {}
  prdArr.forEach((prd) => {
    return mapObj[prd.sku] = prd.name.replace('BIAS', '')
  })
  return mapObj;
}

export default buildMapSkuToName;