var SQL = function (sql) {
  this.sql = sql || '';
  this._orderBy = [];
  this._limit = [];
  this._groupBy = [];
  this._from = '';
  this._where = '';
};

SQL.prototype.select = function (columns) {
  columns = columns || '*';
  columns = Array.isArray(columns) ? columns.join(', ') : columns;
  this.sql = 'SELECT ' + columns;
  return this;
};

SQL.prototype.from = function (table) {
  if (table instanceof SQL) {
    this._from = '(' + table.toString() + ')';
  } else {
    this._from = table;
  }
  return this;
};

SQL.prototype.where = function (where) {
  this._where = typeof where === 'string' ? where : where.toString();
  return this;
};

SQL.prototype.groupBy = function (groupBy) {
  this._groupBy.push(groupBy);
  return this;
};

SQL.prototype.orderBy = function (order, sorting) {
  this._orderBy.push(order + (sorting ? ' DESC' : ''));
  return this;
};

SQL.prototype.descBy = function (order) {
  this._orderBy.push(order + ' DESC');
  return this;
};

SQL.prototype.ascBy = function (order) {
  this.orderBy(order);
  return this;
};

SQL.prototype.limit = function (start, end) {
  // limit(10) => 0, 10
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  this._limit = [start, end];
  return this;
};

SQL.prototype.toString = function (data) {
  var sql = this.sql;
  if (this._from) {
    sql += ' FROM ' + this._from;
  }

  if (this._where) {
    sql += ' WHERE ' + this._where;
  }

  if (this._groupBy.length > 0) {
    sql += ' GROUP BY ' + this._groupBy.join(', ');
  }

  if (this._orderBy.length > 0) {
    sql += ' ORDER BY ' + this._orderBy.join(', ');
  }

  if (this._limit.length > 0 ) {
    sql += ' LIMIT ' + this._limit.join(', ');
  }

  return sql;
};

SQL.prototype.toSQL = function (map) {
  var sql = this.toString();
  if (map) {
    return sql.replace(/:([^\s|)]*)/g, function (token, key) {
      var value = map[key];
      var ret;
      if (typeof value === "string") {
        ret = '"' + value + '"';
      } else if (Array.isArray(value)) {
        var arr = [];
        for (var i = 0; i < value.length; i++) {
          var item = value[i];
          var type = typeof item;
          if (type === "string") {
            arr.push('"' + item + '"');
          } else if (type === "number") {
            arr.push(item);
          }
        }
        ret = arr.join(', ');
      } else {
        ret = value;
      }
      return ret;
    });
  } else {
    return sql;
  }
};

module.exports = SQL;
