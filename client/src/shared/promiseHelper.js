// Idea from https://juejin.im/post/5c49eb28f265da613a545a4b
const enRichPromise = promise => {
  return promise.then(data => [null, data]).catch(err => [err, null]);
};

const promisify = func => (...args) =>
  new Promise((resolve, reject) => {
    func(...args, (error, data) => {
      if (!error) return resolve(data);
      if (error instanceof Error) reject(error);
      else resolve(error);
    });
  });

export default enRichPromise;
export { promisify };
