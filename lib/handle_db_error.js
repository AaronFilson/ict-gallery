module.exports = exports = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'Internal Server Error. Please try again or contact the administrator.'});
};
