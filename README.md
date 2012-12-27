iQuery [![Build Status](https://travis-ci.org/JacksonTian/iquery.png?branch=master)](https://travis-ci.org/JacksonTian/iquery)
=====
## CRUD
### SELECT
Require:

```
var select = require('iquery').select;
```  
Usage:

```
select('a, b, c, d')
  .from('table')
  .where('e = f')
  .groupBy('g')
  .orderBy('a')
  .limit(0, 100)
  .toString();
// =>
SELECT a, b, c, d
  FROM table
  WHERE e = f
  GROUP BY g
  ORDER BY a
  LIMIT 0, 100
```

#### select from
```
select('*')
  .from('table')
  .toString();
// OR
select()
  .from('table')
  .toString();
// =>
SELECT * FROM table

select('a, b, c, d')
  .from('table')
  .toString();
// =>
SELECT a, b, c, d FROM table

select(['a', 'b', 'c', 'd'])
  .from('table')
  .toString();
// =>
SELECT a, b, c, d FROM table
```

#### where
```
select('*')
  .from('table')
  .where('a = b')
  .toString();
// =>
SELECT * FROM table WHERE a = b
```
[More where condition]()

#### groupBy
```
select('*')
  .from('table')
  .groupBy('c')
  .toString();
// =>
SELECT * FROM table GROUP BY c

select('*')
  .from('table')
  .groupBy('c, d')
  .toString();
// =>
SELECT * FROM table GROUP BY c, d
```

#### orderBy
```
select('*')
  .from('table')
  .orderBy('d DESC')
  .toString();
// =>
SELECT * FROM table ORDER BY d DESC
```
[More orderBy case]()

#### limit
```
select('*')
  .from('table')
  .limit(100)
  .toString();
// =>
SELECT * FROM table LIMIT 0, 100

select('*')
  .from('table')
  .limit(100, 200)
  .toString();
// =>
SELECT * FROM table LIMIT 100, 200
```

### Update
TODO
### Delete
TODO
### Insert
TODO

## Where/Find
Require:

```
var Where = require('iquery').Where;
var where = new Where();
var where = new Where('a = b');
// a = b
select('*').from('table').where(where).toString();
// =>
SELECT * FROM table WHERE a = b
```
### and
```
where.and({a: 'b'}).toString();
// a = :b
where.and({a: 'b', c: 'd'}).toString();
// a = :b AND c = :d
where.and({a: 'b', c: 'd', e: 'f'}).toString();
// a = :b AND c = :d AND e = :f
// Chain
where.and({a: 'b'}).and({c: 'd'}).toString();
// a = :b AND c = :d
```
### or
```
where.or({a: 'b'}).toString();
// a = :b
where.or({a: 'b', c: 'd'}).toString();
// a = :b OR c = :d
where.and({a: 'b', c: 'd', e: 'f'}).toString();
// a = :b OR c = :d OR e = :f
// Chain
where.or({a: 'b'}).or({c: 'd'}).toString();
// a = :b OR c = :d
```
### complex
```
where.and({a: 'b', c: 'd'}).or({e: 'f', g: 'h'}).toString();
// a = :b AND c = :d OR e = :f OR g = :h
```

#### a and b or c
```
where.and({a: 'b', c: 'd'}).or({e: 'f'}).toString();
// a = :b AND c = :d OR e = :f
```
#### a and (b or c)
__bracket__

```
where.and({a: 'b'}).and(new Where().or({c: 'd', e: 'f'}).bracket()).toString();
// a = :b AND (c = :d OR e = :f)
```
