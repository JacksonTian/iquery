var should = require('should');
var select = require('../').select;
var Where = require('../').Where;
var where = require('../').where;

describe('index.js', function () {
  describe('select', function () {
    it('should get empty string', function () {
      var sql = select("*").from('table');
      sql.toString().should.equal('SELECT * FROM table');
    });
  });

  describe('where', function () {
    it('should get Where instance', function () {
      where().should.be.an.instanceOf(Where);
    });
  });
});
