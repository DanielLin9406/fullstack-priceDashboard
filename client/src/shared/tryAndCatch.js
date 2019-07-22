// Idea from https://juejin.im/post/5c49eb28f265da613a545a4b
export default enRichPromise = promise => {
  return promise.then(data => [null, data]).catch(err => [err, null]);
};
