var should = require('should');
var Where = require('../').Where;

describe('where.js', function () {
  describe('toString', function () {
    it('should get empty string', function () {
      var where = new Where();
      where.toString().should.equal('');
    });
  });

  describe('pair', function () {
    it('should get pair', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': '早点睡'
      }).should.eql([
        "hehe = :hehe"
      ]);
    });

    it('should get pair when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).should.eql([
        "hehe = :hehe",
        "zaima = :zaima"
      ]);
    });

    it('should get pair in', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $in: []
        }
      }).should.eql([
        "hehe IN (:hehe__in)"
      ]);
    });

    it('should get pair contains', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $contains: 'quxizao'
        }
      }).should.eql([
        "hehe CONTAINS (:hehe__contains)"
      ]);
    });

    it('should get pair custom', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $custom: 'quxizao'
        }
      }).should.eql([]);
    });

    it('should get pair ne', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $ne: "- -"
        }
      }).should.eql([
        "hehe <> :hehe__ne"
      ]);
    });

    it('should get pair >=', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $gte: []
        }
      }).should.eql([
        "hehe >= :hehe__gte"
      ]);
    });

    it('should get pair >', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $gt: []
        }
      }).should.eql([
        "hehe > :hehe__gt"
      ]);
    });

    it('should get pair <=', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $lte: []
        }
      }).should.eql([
        "hehe <= :hehe__lte"
      ]);
    });

    it('should get pair <', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $lt: []
        }
      }).should.eql([
        "hehe < :hehe__lt"
      ]);
    });

    it('should get pair like', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $like: 'hehe'
        }
      }).should.eql([
        "hehe LIKE :hehe__like"
      ]);
    });
  });

  describe('and', function () {
    it('should get where', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': '早点睡'
      }).toString().should.equal('hehe = :hehe');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).toString().should.equal('hehe = :hehe AND zaima = :zaima');
    });

    it('should get and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).and(new Where().and({
        'ganma': '忙不'
      })).toString().should.equal('hehe = :hehe AND zaima = :zaima AND ganma = :ganma');
    });
  });

  describe('or', function () {
    it('should get where', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡'
      }).toString().should.equal('hehe = :hehe');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).toString().should.equal('hehe = :hehe OR zaima = :zaima');
    });

    it('should get and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).or(new Where().or({
        'ganma': '忙不'
      })).toString().should.equal('hehe = :hehe OR zaima = :zaima OR ganma = :ganma');
    });
  });

  describe('bracket', function () {
    it('should get where', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡'
      }).bracket().toString().should.equal('(hehe = :hehe)');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).bracket().toString().should.equal('(hehe = :hehe OR zaima = :zaima)');
    });
  });

  describe('complex', function () {
    it('should get where or and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡'
      }).bracket().and({
        'zaima': "去洗澡"
      }).toString().should.equal('(hehe = :hehe) AND zaima = :zaima');
    });

    it('should get where or or', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡'
      }).bracket().or({
        'zaima': "去洗澡"
      }).toString().should.equal('(hehe = :hehe) OR zaima = :zaima');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).bracket().toString().should.equal('(hehe = :hehe OR zaima = :zaima)');
    });

    it('should a and b or c and d', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': '早点睡',
        'zaima': '去洗澡'
      }).or(new Where().and({
        'ganma': '忙不',
        'nvshen': '屌丝'
      })).toString().should.equal('hehe = :hehe AND zaima = :zaima OR ganma = :ganma AND nvshen = :nvshen');
    });

    it('should a and (b or c) and d', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': '早点睡'
      }).and(new Where().or({
        'zaima': '去洗澡',
        'ganma': '忙不'
      }).bracket()).and({
        'nvshen': '屌丝'
      }).toString().should.equal('hehe = :hehe AND (zaima = :zaima OR ganma = :ganma) AND nvshen = :nvshen');
    });
  });
});