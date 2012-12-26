var SQL = require('./sql');

var Select = function () {
  var sql = new SQL();
  return sql.select.apply(sql, arguments);
};

module.exports = Select;