module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here
	function getPlayers(res, mysql, context, complete){
		mysql.pool.query("SELECT Players.playerName, Locations.locationName, Items.itemName FROM Players\
        JOIN PlayersItems on PlayersItems.playerID = Players.playerID\
        JOIN Locations on Locations.locationID = Players.currentLocationID\
        JOIN Items on Items.itemID = PlayersItems.itemID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.players = results;
            complete();
        });
    }

    function getQuests(res, mysql, context, complete){
		mysql.pool.query("SELECT Quests.questName, Locations.locationName, Items.itemName FROM Quests\
        JOIN Items on Items.questRewardedFrom = Quests.questID\
        JOIN Locations on Locations.locationID = Quests.questLocation;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.quests = results;
            complete();
        });
    }

    function getlocations(res, mysql, context, complete){
		mysql.pool.query("SELECT Locations.locationName FROM Locations\
        JOIN Players on Players.currentLocationID = Locations.locationID", function(error, results, fields){
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
//renders initial page view
   router.get('/', function(req, res){
       var callbackCount = 0;
       var context = {};
       context.jsscripts = ["deletePlayers.js"];
       var mysql = req.app.get('mysql');
       getPlayers(res, mysql, context, complete);
       getQuests(res, mysql, context, complete);
       getlocations(res, mysql, context, complete);
       getQuestDrop(res, mysql, context, complete);
       getitems(res, mysql, context, complete);
       function complete(){
           callbackCount++;
           if(callbackCount >= 5){
               res.render('playgame', context);
           }
       }
   });
   return router;
}();