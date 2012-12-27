var Where = function (where) {
  this.where = where || '';
  this.branch = 0;
};

/**
 * Generate a = :a AND b = :b
 * @param {Object} conditions condition map
 */
Where.prototype.and = function (conditions) {
  // and('1 = 1');
  var and = '';
  if (typeof conditions === 'string') {
    and = conditions;
  }

  if (typeof conditions === 'object') {
    // and(new Where().or({hehe: 'xizao'}));
    if (conditions instanceof Where) {
      and = conditions.toString();
    } else {
    // and({hehe: 'xizao'});
      var pairs = this.pair(conditions);
      and = pairs.join(' AND ');
    }
  }
  this.where = (this.where ? this.where + ' AND ' : '') + and;
  return this;
};

/**
 * Generate a = :a OR b = :b
 * @param {Object} conditions condition map
 */
Where.prototype.or = function (conditions) {
  // or('1 = 1');
  var or = '';
  if (typeof conditions === 'string') {
    or = conditions;
  }

  if (typeof conditions === 'object') {
    // or(new Where().or({hehe: 'xizao'}));
    if (conditions instanceof Where) {
      this.branch += conditions.branch;
      or = conditions.toString();
    } else {
    // or({hehe: 'xizao'});
      var pairs = this.pair(conditions);
      this.branch += pairs.length - 1;
      or = pairs.join(' OR ');
    }
  }

  this.where = (this.where ? this.where + ' OR ' : '') + or;
  return this;
};

Where.prototype.toString = function () {
  return this.where;
};

Where.prototype.pair = function (conditions) {
  var keys = [];
  if (conditions) {
    for (var k in conditions) {
      if (!Object.prototype.hasOwnProperty.call(conditions, k)) {
        continue;
      }
      var condition = conditions[k];
      if (condition && typeof condition === 'object' && !Array.isArray(condition) && !(condition instanceof Date)) {
        for (var cname in condition) {
          var paramName = ":" + condition[cname];
          var key = null;
          switch (cname) {
            case '$contains':
              key = k + ' CONTAINS (' + paramName + ')';
              break;
            case '$in':
              key = k + ' IN (' + paramName + ')';
              break;
            case '$gt':
              key = k + ' > ' + paramName + '';
              break;
            case '$gte':
              key = k + ' >= ' + paramName + '';
              break;
            case '$lt':
              key = k + ' < ' + paramName + '';
              break;
            case '$lte':
              key = k + ' <= ' + paramName + '';
              break;
            case '$ne':
              key = k + ' <> ' + paramName + '';
              break;
            case '$like':
              key = k + ' LIKE ' + paramName + '';
              break;
            default:
              continue;
          }
          if (paramName) {
            keys.push(key);
          }
        }
      } else {
        keys.push(k + ' = :' + conditions[k]);
      }
    }
  }
  return keys;
};

Where.prototype.bracket = function () {
  this.where = this.branch > 0 ? '(' + this.where + ')' : this.where;
  // 条件收敛为1
  if (this.branch > 1) {
    this.branch = 1;
  }
  return this;
};

module.exports = Where;