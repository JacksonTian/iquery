exports.SQL = require('./sql');
exports.Where = require('./where');
exports.Order = require('./order');

exports.select = function () {
  var sql = new exports.SQL();
  return sql.select.apply(sql, arguments);
};
