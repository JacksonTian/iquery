var should = require('should');
var select = require('../').select;

describe('index.js', function () {
  describe('select', function () {
    it('should get empty string', function () {
      var sql = select("*").from('table');
      sql.toString().should.equal('SELECT * FROM table');
    });
  });
});
