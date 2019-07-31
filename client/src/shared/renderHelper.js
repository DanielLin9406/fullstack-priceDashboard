import { testExternalErrMsg } from './testFetch';

const renderErrMsg = errMsg => {
  if (testExternalErrMsg(errMsg)) {
    switch (Object.prototype.toString.call(errMsg)) {
      case '[object Array]':
        return errMsg.filter(ele => ele).map(ele => <div>{ele}</div>);
      default:
        return errMsg;
    }
  }
  return null;
};

export default renderErrMsg;
