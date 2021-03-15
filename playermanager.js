module.exports = function(){
    var express = require('express');
    var router = express.Router();

//handles create player form
	router.post('/', function(req, res){
        console.log(req.body);
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
	
	//handles deleting a Player
	router.delete('/:playerID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Players WHERE playerID = ?";
        var inserts = [req.params.playerID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
	
	//handles deleting from PlayersItems
	router.delete('/playerID/:playerID/itemID/:itemID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM PlayersItems WHERE playerID = ? AND itemID = ?";
        var inserts = [req.params.playerID, req.params.itemID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
	
	//get list of Players for dropdown
	/*function getPlayers(res, mysql, context, complete){
		mysql.pool.query("SELECT playerID, playerName FROM Players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			console.log(results);
            context.players  = results;
            complete();
        });
    }*/
	
	//get Players and Items for dropdowns
	function getPlayersItems(res, mysql, context, complete){

		mysql.pool.query("SELECT playerID, playerName FROM Players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			var done = 0;
            context.players  = results;
			for (let i = 0; i < context.players.length; i++){
				var sql = "SELECT Items.itemID, Items.itemName FROM (PlayersItems JOIN Items ON PlayersItems.itemID = Items.itemID) WHERE PlayersItems.playerID = ?"
				var insert = context.players[i].playerID;
				mysql.pool.query(sql,insert,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
					context.players[i].items = results;
					done++;
					if(done >= context.players.length){
						complete();
					}
					
				});
			}
		});
	}
	
//renders initial page view
    router.get('/', function(req, res){
	var context = {};
	context.jsscripts = ["deletePlayers.js"];
	var callbackCount = 0;
    var mysql = req.app.get('mysql');
    //getPlayers(res, mysql, context, complete);
	getPlayersItems(res, mysql, context, complete);
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