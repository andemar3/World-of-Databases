module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here
	function getPlayers(res, mysql, context, complete){
		mysql.pool.query("SELECT Players.playerName, Players.playerID, Locations.locationName, Items.itemName, Quests.questName FROM Players\
        LEFT JOIN PlayersItems on PlayersItems.playerID = Players.playerID\
        LEFT JOIN Locations on Locations.locationID = Players.currentLocationID\
        LEFT JOIN Items on Items.itemID = PlayersItems.itemID\
        LEFT JOIN Quests on Quests.questID = Players.currentQuest", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.players = results;
       //     console.log(context);
            complete();
        });
    }

    function getQuests(res, mysql, context, complete){
		mysql.pool.query("SELECT questID, questName FROM Quests", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.quests = results;
            complete();
        });
    }

    function getlocations(res, mysql, context, complete){
		mysql.pool.query("SELECT locationID, locationName FROM Locations", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }

    //update data
function getPlayer(res, mysql, context, playerID, complete){
    var sql = "SELECT Players.playerID, Players.playerName, Players.currentQuest, Players.currentLocationID, Players.playerHealth, Players.playerMagic, Players.strengthStat, Players.intelligenceStat, Players.defenceStat FROM Players WHERE Players.playerID = ?";
	console.log(playerID);
    var inserts = [playerID];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.player = results[0];
        console.log(context.player);
        complete();
    });
}

function getPlayerLocation(res, mysql, context, playerID, complete){
    var sql = "SELECT Locations.locationName, Locations.locationID FROM Locations JOIN Players ON Players.currentLocationID = Locations.locationID WHERE Players.playerID = ?";
	console.log(playerID);
    var inserts = [playerID];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.playerLocation = results[0];
        complete();
    });
}

function getPlayerQuest(res, mysql, context, playerID, complete){
    var sql = "SELECT Quests.questName, Quests.questID FROM Quests JOIN Players ON Players.currentQuest = Quests.questID WHERE Players.playerID = ?";
	console.log(playerID);
    var inserts = [playerID];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
		console.log(context.playerQuest);
        context.playerQuest = results[0];
        complete();
    });
}

function getPlayerItems(res, mysql, context, playerID, complete){
    var sql = "SELECT Items.itemName, Items.itemID FROM Items JOIN PlayersItems ON Items.itemID = PlayersItems.itemID JOIN Players ON Players.playerID = PlayersItems.playerID WHERE Players.playerID = ? ";
	console.log(playerID);
    var inserts = [playerID];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.playerItems = results;
        console.log(context.playerItems);
        complete();
    });
}

	router.put('/:playerID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Players SET currentLocationID =? WHERE playerID =?";
        var inserts = [req.body.currentlocation, req.params.playerID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                console.log(inserts);
                res.status(200);
                res.end();
            }
        });
    });

//render player handlebars page
    router.get('/:playerID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        getPlayer(res, mysql, context, req.params.playerID, complete);
        getlocations(res, mysql, context, complete);
        getQuests(res, mysql, context, complete);
		getPlayerLocation(res, mysql, context, req.params.playerID, complete);
		getPlayerQuest(res, mysql, context, req.params.playerID, complete);
		getPlayerItems(res, mysql, context, req.params.playerID, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                console.log(context);
                res.render('updateplayer', context);
            }
        }
    });

//renders initial page view
   router.get('/', function(req, res){
       var callbackCount = 0;
       var context = {};
       context.jsscripts = ["deletePlayers.js"];
       var mysql = req.app.get('mysql');
       getPlayers(res, mysql, context, complete);
       getlocations(res, mysql, context, complete);
       function complete(){
           callbackCount++;
           if(callbackCount >= 2){
        //       console.log(context);
               res.render('playgame', context);
           }
       }
   });
   return router;
}();
