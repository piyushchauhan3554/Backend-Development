const { getInfo } = require("../utils/notebook");
const auth = (req, res, next) => {
  const userId = req.cookies.uid;
  if (!userId) {
    return res.redirect("/login");
  }
  const user = getInfo(userId);
  if (!user) return res.redirect("/login");
  req.user=user
  next()
};

module.exports = { auth };
