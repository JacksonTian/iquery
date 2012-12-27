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
        'hehe': 'zaodianshui'
      }).should.eql([
        "hehe = :zaodianshui"
      ]);
    });

    it('should get pair when property at prototype', function () {
      var Obj = function () {
      };
      Obj.prototype.key = "prototype_value";
      var where = new Where();
      where.toString().should.equal('');
      where.pair(new Obj()).should.eql([]);
    });

    it('should get pair when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).should.eql([
        "hehe = :zaodianshui",
        "zaima = :quxizao"
      ]);
    });

    it('should get pair in', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $in: 'zaodianshui'
        }
      }).should.eql([
        "hehe IN (:zaodianshui)"
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
        "hehe CONTAINS (:quxizao)"
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
          $ne: "quxizao"
        }
      }).should.eql([
        "hehe <> :quxizao"
      ]);
    });

    it('should get pair >=', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.pair({
        'hehe': {
          $gte: 'hehe__gte'
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
          $gt: 'hehe__gt'
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
          $lte: 'hehe__lte'
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
          $lt: 'hehe__lt'
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
        "hehe LIKE :hehe"
      ]);
    });

    it('should ok when lte & gte', function () {
      var condition = {
        date: {
          $gte: "startdate",
          $lte: "enddate"
        }
      };
      var where = new Where();
      where.toString().should.equal('');
      where.pair(condition).should.eql([
        "date >= :startdate",
        "date <= :enddate"
      ]);
    });
  });

  describe('and', function () {
    it('should get where', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui'
      }).toString().should.equal('hehe = :zaodianshui');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).toString().should.equal('hehe = :zaodianshui AND zaima = :quxizao');
    });

    it('should get and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).and(new Where().and({
        'ganma': 'mangbu'
      })).toString().should.equal('hehe = :zaodianshui AND zaima = :quxizao AND ganma = :mangbu');
    });
  });

  describe('or', function () {
    it('should get where', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui'
      }).toString().should.equal('hehe = :zaodianshui');
    });

    it('should ok when string', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or('hehe = :zaodianshui').toString().should.equal('hehe = :zaodianshui');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).toString().should.equal('hehe = :zaodianshui OR zaima = :quxizao');
    });

    it('should get and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).or(new Where().or({
        'ganma': 'mangbu'
      })).toString().should.equal('hehe = :zaodianshui OR zaima = :quxizao OR ganma = :mangbu');
    });
  });

  describe('bracket', function () {
    it('should ok or', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui'
      }).bracket().toString().should.equal('hehe = :zaodianshui');
    });

    it('should ok and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui'
      }).bracket().toString().should.equal('hehe = :zaodianshui');
    });

    it('should ok when multi and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).bracket().toString().should.equal('hehe = :zaodianshui AND zaima = :quxizao');
    });

    it('should ok when multi or', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).bracket().toString().should.equal('(hehe = :zaodianshui OR zaima = :quxizao)');
    });
  });

  describe('complex', function () {
    it('should get where or and', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui'
      }).bracket().and({
        'zaima': "quxizao"
      }).toString().should.equal('hehe = :zaodianshui AND zaima = :quxizao');
    });

    it('should get where or or', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui'
      }).bracket().or({
        'zaima': "quxizao"
      }).toString().should.equal('hehe = :zaodianshui OR zaima = :quxizao');
    });

    it('should get where when multi', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.or({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).bracket().toString().should.equal('(hehe = :zaodianshui OR zaima = :quxizao)');
    });

    it('should a and b or c and d', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui',
        'zaima': 'quxizao'
      }).or(new Where().and({
        'ganma': 'mangbu',
        'nvshen': 'diaosi'
      })).toString().should.equal('hehe = :zaodianshui AND zaima = :quxizao OR ganma = :mangbu AND nvshen = :diaosi');
    });

    it('should a and (b or c) and d', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({
        'hehe': 'zaodianshui'
      }).and(new Where().or({
        'zaima': 'quxizao',
        'ganma': 'mangbu'
      }).bracket()).and({
        'nvshen': 'diaosi'
      }).toString().should.equal('hehe = :zaodianshui AND (zaima = :quxizao OR ganma = :mangbu) AND nvshen = :diaosi');
    });

    it('should a and b and c or d', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({a: 'b', c: 'd', e: 'f'}).or({g: 'h'}).toString()
      .should.equal('a = :b AND c = :d AND e = :f OR g = :h');
    });

    it('should a and b or c or d', function () {
      var where = new Where();
      where.toString().should.equal('');
      where.and({a: 'b', c: 'd'}).or({e: 'f', g: 'h'}).toString()
      .should.equal('a = :b AND c = :d OR e = :f OR g = :h');
    });
  });
});