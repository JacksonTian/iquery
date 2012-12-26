var should = require('should');
var SQL = require('../').SQL;
var Order = require('../').Order;

describe('sql.js', function () {
  describe('all', function () {
    it('should be ok', function () {
      var sql = new SQL();
      var order = new Order();
      order.sort(['column2', true]);
      sql.select('*').from('table').where('1 = 1').groupBy('column1').orderBy(order).limit(100);
      sql.toString().should.equal('SELECT * FROM table WHERE 1 = 1 GROUP BY column1 ORDER BY column2 DESC LIMIT 0, 100');
    });
  });
});
