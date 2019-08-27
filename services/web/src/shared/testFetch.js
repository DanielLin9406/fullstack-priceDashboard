const testExternalLoading = nextProps => {
  if (
    nextProps.isLoading_scheduledPrice ||
    nextProps.isLoading_productPrice ||
    nextProps.isLoading_licenseRule
  ) {
    return true;
  }
  return false;
};

const testFetchLoading = loading => {
  if (loading.length > 0 && loading.some(ele => ele)) {
    return true;
  }
  return false;
};

const testExternalErrMsg = errMsg => {
  switch (Object.prototype.toString.call(errMsg)) {
    case '[object Array]':
      return errMsg.some(ele => ele);
    case '[object String]':
      return true;
    default:
      return false;
  }
};

export default testExternalLoading;
export { testExternalErrMsg, testFetchLoading };
