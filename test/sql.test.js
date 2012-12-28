var should = require('should');
var SQL = require('../').SQL;
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

    it('should be ok when empty', function () {
      var sql = new SQL();
      sql.select().toString().should.equal('SELECT *');
    });

    it('should be ok Array', function () {
      var sql = new SQL();
      sql.select(['a', 'b', 'c', 'd']).toString().should.equal('SELECT a, b, c, d');
    });
  });

  describe('from', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.select('*').from('table').toString().should.equal('SELECT * FROM table');
    });

    it('should be ok from sub query', function () {
      var sql1 = new SQL();
      sql1.select('*').from('table');
      var sql2 = new SQL();
      sql2.select('*').from(sql1);
      sql2.toString().should.equal('SELECT * FROM (SELECT * FROM table)');
    });
  });

  describe('where', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.select('*').from('table').where('a = b');
      sql.toString().should.equal('SELECT * FROM table WHERE a = b');
    });
  });

  describe('groupBy', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.select('*').from('table').where('a = b').groupBy('c');
      sql.toString().should.equal('SELECT * FROM table WHERE a = b GROUP BY c');
    });
  });

  describe('orderBy', function () {
    describe('orderBy', function () {
      it('should be ok with string', function () {
        var sql = new SQL();
        sql.select('*').from('table').orderBy('count(order_id) DESC');
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id) DESC');
      });

      it('should be ok multi', function () {
        var sql = new SQL();
        sql.select('*').from('table').orderBy('count(order_id) DESC').orderBy('price', true);
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id) DESC, price DESC');
      });

      it('should be ok sort desc', function () {
        var sql = new SQL();
        sql.select('*').from('table').orderBy('count(order_id)', true);
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id) DESC');
      });

      it('should be ok sort asc', function () {
        var sql = new SQL();
        sql.select('*').from('table').orderBy('count(order_id)', false);
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id)');
      });
    });

    describe('descBy', function () {
      it('should be ok sort desc', function () {
        var sql = new SQL();
        sql.select('*').from('table').descBy('count(order_id)');
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id) DESC');
      });

      it('should be ok multi', function () {
        var sql = new SQL();
        sql.select('*').from('table').descBy('count(order_id)').descBy('price');
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id) DESC, price DESC');
      });
    });

    describe('ascBy', function () {
      it('should be ok sort asc', function () {
        var sql = new SQL();
        sql.select('*').from('table').ascBy('count(order_id)');
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id)');
      });

      it('should be ok multi', function () {
        var sql = new SQL();
        sql.select('*').from('table').ascBy('count(order_id)').ascBy('price');
        sql.toString().should.equal('SELECT * FROM table ORDER BY count(order_id), price');
      });
    });
  });

  describe('limit', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.select().from('table').limit(100);
      sql.toString().should.equal('SELECT * FROM table LIMIT 0, 100');
    });

    it('should be ok limit(10, 20)', function () {
      var sql = new SQL();
      sql.select().from('table').limit(10, 20);
      sql.toString().should.equal('SELECT * FROM table LIMIT 10, 20');
    });

    it('should be ok limit(10, 20).limit(30, 40)', function () {
      var sql = new SQL();
      sql.select().from('table').limit(10, 20).limit(30, 40);
      sql.toString().should.equal('SELECT * FROM table LIMIT 30, 40');
    });
  });

  describe('all', function () {
    it('should be ok', function () {
      var sql = new SQL();
      sql.select('*').from('table').where('1 = 1').groupBy('column1').orderBy('column2', true).limit(100);
      sql.toString().should.equal('SELECT * FROM table WHERE 1 = 1 GROUP BY column1 ORDER BY column2 DESC LIMIT 0, 100');
    });

    it('should be ok case1', function () {
      var sql = new SQL();
      var where = new Where();
      where.and({tag: 'tag'});
      sql.select('auction').from("trade").where(where).groupBy('auction').orderBy('count(order) DESC').limit(200);
      sql.toString().should.equal('SELECT auction FROM trade WHERE tag = :tag GROUP BY auction ORDER BY count(order) DESC LIMIT 0, 200');
    });

    it('should be ok case2', function () {
      var sql = new SQL();
      var where = new Where();
      var condition = new Where();
      condition.or({
        cid: {
          $in: 'cids'
        },
        cid1: {
          $in: 'cid1s'
        }
      }).bracket();
      where.and({tag1: 'tag1', tag2: 'tag2'}).and(condition.toString());
      sql.select('auction').from("trade").where(where).groupBy('auction').orderBy('count(order) DESC').limit(200);
      sql.toString().should.equal('SELECT auction FROM trade WHERE tag1 = :tag1 AND tag2 = :tag2 AND (cid IN (:cids) OR cid1 IN (:cid1s)) GROUP BY auction ORDER BY count(order) DESC LIMIT 0, 200');
    });
  });

  describe('toSQL', function () {
    it('should be ok', function () {
      var sql = new SQL();
      var where = new Where();
      where.and({a: 'b', c: 'd'});
      sql.select("*").from('table').where(where);
      sql.toSQL().should.equal('SELECT * FROM table WHERE a = :b AND c = :d');
      var map = {
        b: 'hehe',
        d: 'quxizao'
      };
      sql.toSQL(map).should.equal('SELECT * FROM table WHERE a = "hehe" AND c = "quxizao"');
      var newmap = {
        b: 'hehe'
      };
      sql.toSQL(newmap).should.equal('SELECT * FROM table WHERE a = "hehe" AND c = undefined');
    });

    it('should be ok with number', function () {
      var sql = new SQL();
      var where = new Where();
      where.and({a: 'b', c: 'd'});
      sql.select("*").from('table').where(where);
      sql.toSQL().should.equal('SELECT * FROM table WHERE a = :b AND c = :d');
      var map = {
        b: 1,
        d: 2
      };
      sql.toSQL(map).should.equal('SELECT * FROM table WHERE a = 1 AND c = 2');
      var newmap = {
        b: 1
      };
      sql.toSQL(newmap).should.equal('SELECT * FROM table WHERE a = 1 AND c = undefined');
    });

    it('should be ok with array', function () {
      var sql = new SQL();
      var where = new Where();
      where.and({
        c: {
          $in: 'd'
        }
      });
      sql.select("*").from('table').where(where);
      sql.toSQL().should.equal('SELECT * FROM table WHERE c IN (:d)');
      var map = {
        b: ['hehe', 'zaima'],
        d: ['quxizao', 'ganma']
      };
      sql.toSQL(map).should.equal('SELECT * FROM table WHERE c IN ("quxizao", "ganma")');
      var newmap = {
        d: [1, 2]
      };
      sql.toSQL(newmap).should.equal('SELECT * FROM table WHERE c IN (1, 2)');
    });
  });
});
