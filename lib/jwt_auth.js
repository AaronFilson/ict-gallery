const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'tests');
  } catch(e) {
    return res.status(401).json({msg: 'User authentication failed.'});
  }
  User.findOne({_id: decoded.id}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'User authentication failed.'});
    }

    if (!user) return res.status(401).json({msg: 'User authentication failed.'});

    req.user = user;
    next();
  });
};
