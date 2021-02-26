var mysql = require('mysql');
var pool = mysql.createPool({
  /*connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_andemar3',
  password        : '8050',
  database        : 'cs340_andemar3'*/
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kuahm',
  password        : '3597',
  database        : 'cs340_kuahm'
});
module.exports.pool = pool;
