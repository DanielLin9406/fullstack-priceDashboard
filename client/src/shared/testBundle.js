const testBundle = (sku) => {
  const reg = /^B/;
  if (reg.test(sku)){
    return true;
  }
  return false;
}

export default testBundle;