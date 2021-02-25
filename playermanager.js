module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here

//handles create player form
	router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Players (playerName) VALUES (?)";
		var context = {};
        var inserts = [req.body.playerName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
				context.message = ["New player created!"];
                res.render('playermanager', context)
            }
        });
    });
	
//renders initial page view
    function renderPlayerManager(req, res){
	var context = {};
	res.render('playermanager', context)
    }
	
    router.get('/', renderPlayerManager);
	
	return router;
}();