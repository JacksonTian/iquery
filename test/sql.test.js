var should = require('should');
var SQL = require('../').SQL;
var Order = require('../').Order;
var Where = require('../').Where;

describe('sql.js', function () {
  describe('SQL', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.toString().should.equal('');
      var sql2 = new SQL('SELECT * FROM table');
      sql2.toString().should.equal('SELECT * FROM table');
    });
  });

  describe('select', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.select('*').toString().should.equal('SELECT *');
    });
  });

  describe('all', function () {
    it('should be ok', function () {
      var sql = new SQL();
      var order = new Order();
      order.sort(['column2', true]);
      sql.select('*').from('table').where('1 = 1').groupBy('column1').orderBy(order).limit(100);
      sql.toString().should.equal('SELECT * FROM table WHERE 1 = 1 GROUP BY column1 ORDER BY column2 DESC LIMIT 0, 100');
    });

    it('should be ok case1', function () {
      var sql = new SQL();
      var where = new Where();
      where.and({tag: 1});
      sql.select('auction').from("trade").where(where).groupBy('auction').orderBy('count(order) DESC').limit(200);
      sql.toString().should.equal('SELECT auction FROM trade WHERE tag = :tag GROUP BY auction ORDER BY count(order) DESC LIMIT 0, 200');
    });

    it('should be ok case2', function () {
      var sql = new SQL();
      var where = new Where();
      var condition = new Where();
      condition.or({
        cid: {
          $in: [1, 2, 3]
        },
        cid1: {
          $in: [4, 5, 6]
        }
      }).bracket();
      where.and({tag1: 1, tag2: 2}).and(condition.toString());
      sql.select('auction').from("trade").where(where).groupBy('auction').orderBy('count(order) DESC').limit(200);
      sql.toString().should.equal('SELECT auction FROM trade WHERE tag1 = :tag1 AND tag2 = :tag2 AND (cid IN (:cid__in) OR cid1 IN (:cid1__in)) GROUP BY auction ORDER BY count(order) DESC LIMIT 0, 200');
    });
  });
});
