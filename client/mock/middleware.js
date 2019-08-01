module.exports = (req, res, next) => {
  setTimeout(next, 5000);
};
