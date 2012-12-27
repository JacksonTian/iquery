var SQL = function (sql) {
  this.sql = sql || '';
};

SQL.prototype.select = function (columns) {
  columns = columns || '*';
  columns = Array.isArray(columns) ? columns.join(', ') : columns;
  this.sql = 'SELECT ' + columns;
  return this;
};

SQL.prototype.from = function (table) {
  this.sql += ' FROM ' + table;
  return this;
};

SQL.prototype.where = function (where) {
  this.sql += ' WHERE ' + (typeof where === 'string' ? where : where.toString());
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
