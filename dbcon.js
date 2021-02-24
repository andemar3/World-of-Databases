var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_andemar3',
  password        : '8050',
  database        : 'cs340_andemar3'
});
module.exports.pool = pool;
