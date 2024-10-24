const info = function (...params) {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = function (...params) {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
