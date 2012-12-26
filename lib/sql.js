var SQL = function () {
  this.sql = '';
};
SQL.prototype.select = function (columns) {
  this.sql = 'SELECT ' + columns;
  return this;
};

SQL.prototype.from = function (table) {
  this.sql += ' FROM ' + table;
  return this;
};

SQL.prototype.where = function (where) {
  this.sql += ' WHERE ' + where.toString();
  return this;
};

SQL.prototype.groupBy = function (groupBy) {
  this.sql += ' GROUP BY ' + groupBy;
  return this;
};

SQL.prototype.orderBy = function (order) {
  this.sql += ' ORDER BY ' + order.toString();
  return this;
};

SQL.prototype.limit = function (start, end) {
  // limit(10) => 0, 10
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  this.sql += ' LIMIT ' + start + ', ' + end;
  return this;
};

SQL.prototype.toString = function () {
  return this.sql;
};

module.exports = SQL;
