var Order = function () {
  this.order = '';
};

/**
 * Generate a = :a OR b = :b
 * @param {Object} conditions condition array
 * Examples:
 * ```
 * [[column1, sorting], [column2, sorting];
 * ```
 */
Order.prototype.sort = function (conditions) {
  var sorting = [].slice.call(arguments, 0);
  var order = [];
  for (var i = 0; i < sorting.length; i++) {
    var cond = sorting[i];
    order.push(cond[0] + ' ' + (cond[1] ? 'DESC' : 'ASC'));
  }
  this.order = order.join(',');
  return this;
};

Order.prototype.toString = function () {
  return this.order;
};

module.exports = Order;
