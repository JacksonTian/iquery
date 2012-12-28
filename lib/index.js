exports.SQL = require('./sql');
exports.Where = require('./where');

exports.select = function () {
  var sql = new exports.SQL();
  return sql.select.apply(sql, arguments);
};

exports.where = function () {
  return new exports.Where();
};
