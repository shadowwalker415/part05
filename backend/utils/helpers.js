const isEmptyBody = function (body) {
  if (Object.entries(body).length < 1) return true;
  return false;
};

const getToken = function (request) {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = {
  isEmptyBody,
  getToken,
};
