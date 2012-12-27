var Where = function (where) {
  this.where = where || '';
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
      and = this.pair(conditions).join(' AND ');
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
      or = conditions.toString();
    } else {
    // or({hehe: 'xizao'});
      or = this.pair(conditions).join(' OR ');
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
          var paramName = null;
          var key = null;
          switch (cname) {
            case '$contains':
              paramName = k + '__contains';
              key = k + ' CONTAINS (:' + paramName + ')';
              break;
            case '$in':
              paramName = k + '__in';
              key = k + ' IN (:' + paramName + ')';
              break;
            case '$gt':
              paramName = k + '__gt';
              key = k + ' > :' + paramName + '';
              break;
            case '$gte':
              paramName = k + '__gte';
              key = k + ' >= :' + paramName + '';
              break;
            case '$lt':
              paramName = k + '__lt';
              key = k + ' < :' + paramName + '';
              break;
            case '$lte':
              paramName = k + '__lte';
              key = k + ' <= :' + paramName + '';
              break;
            case '$ne':
              paramName = k + '__ne';
              key = k + ' <> :' + paramName + '';
              break;
            case '$like':
              paramName = k + '__like';
              key = k + ' LIKE :' + paramName + '';
              break;
            default:
              continue;
          }
          if (paramName) {
            keys.push(key);
          }
        }
      } else {
        keys.push(k + ' = :' + k);
      }
    }
  }
  return keys;
};

Where.prototype.bracket = function () {
  this.where = '(' + this.where + ')';
  return this;
};

module.exports = Where;