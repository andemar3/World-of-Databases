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
	
	router.delete('/:playerID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Players WHERE playerID = ?";
        var inserts = [req.params.playerID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
	//get list of Players for dropdown
	function getPlayers(res, mysql, context, complete){
		mysql.pool.query("SELECT playerID, playerName FROM Players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.players  = results;
            complete();
        });
    }
	
	
			
	
//renders initial page view
    router.get('/', function(req, res){
	var context = {};
	context.jsscripts = ["deletePlayers.js"];
	var callbackCount = 0;
    var mysql = req.app.get('mysql');
    getPlayers(res, mysql, context, complete);
	//render page when getPlayers has finished
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('playermanager', context);
        }
	}
});

	
	return router;
}();