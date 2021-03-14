module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here
	function getPlayers(res, mysql, context, complete){
		mysql.pool.query("SELECT Players.playerName, Players.playerID, Locations.locationName, Items.itemName, Quests.questName FROM Players\
        LEFT JOIN PlayersItems on PlayersItems.playerID = Players.playerID\
        LEFT JOIN Locations on Locations.locationID = Players.currentLocationID\
        LEFT JOIN Items on Items.itemID = PlayersItems.itemID\
        LEFT JOIN Quests on Quests.questID = Players.currentQuest;", function(error, results, fields){
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
		mysql.pool.query("SELECT questName, questID, questLocation, statRequired, statMinimum, statBoostAmount FROM Quests", function(error, results, fields){
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

    function getQuestDrop(res, mysql, context, complete){
		mysql.pool.query("SELECT Quests.questName FROM Quests\
        JOIN Players on Players.currentQuest = Quests.questID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.questsdrop = results;
            complete();
        });
    }

    function getitems(res, mysql, context, complete){
		mysql.pool.query("SELECT Items.itemName FROM Items;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
            complete();
        });
    }

    //update data
function getPlayer(res, mysql, context, playerID, complete){
    var sql = "SELECT playerID, playerName, numberofQuestsCompleted, currentQuest, currentLocationID, playerHealth, playerMagic, strengthStat, intelligenceStat, defenceStat FROM Players WHERE playerID = ?";
	console.log(playerID);
    var inserts = [playerID];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.player = results;
        console.log(context.player);
        complete();
    });
}

	router.put('/location/:playerID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Players SET currentLocationID = ? WHERE playerID = ?";
        var inserts = [req.body.currentLocationID, req.params.playerID];
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

//render player handlebars page
    router.get('/:playerID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getPlayer(res, mysql, context, req.params.playerID, complete);
        getlocations(res, mysql, context, complete);
        getQuests(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
        //        console.log(context);
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
       //getQuests(res, mysql, context, complete);
       //getlocations(res, mysql, context, complete);
       //getQuestDrop(res, mysql, context, complete);
       //getitems(res, mysql, context, complete);
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
