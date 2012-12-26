var Where = function () {
  this.where = '';
};

/**
 * Generate a = :a AND b = :b
 * @param {Object} conditions condition map
 */
Where.prototype.and = function (conditions) {
  this.where = (this.where ? this.where + ' AND ' : '') + this.pair(conditions).join(' AND ');
  return this;
};

/**
 * Generate a = :a OR b = :b
 * @param {Object} conditions condition map
 */
Where.prototype.or = function (conditions) {
  this.where = (this.where ? this.where + ' OR ' : '') + this.pair(conditions).join(' OR ');
  return this;
};

Where.prototype.toString = function () {
  return this.where;
};

Where.prototype.pair = function (conditions) {
  var keys = [];
  if (conditions) {
    for (var k in conditions) {
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