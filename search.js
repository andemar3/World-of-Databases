module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here
//get all quest with items
	function getQuestandItems(res, mysql, context, complete){
		mysql.pool.query("SELECT Quests.questName, Items.itemName FROM Quests\
        JOIN Items on Items.questRewardedFrom = Quests.questID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.quests = results;
            complete();
        });
    }
	
//get all players & locations
	function getPlayerLocations(res, mysql, context, complete){
		mysql.pool.query("SELECT Players.playerName, Locations.locationName FROM Players\
        JOIN Locations on Players.currentLocationID = Locations.locationID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.players = results;
            complete();
        });
    }

    function getPlayerLocations(res, mysql, context, complete){
		mysql.pool.query("SELECT Players.playerName, Locations.locationName FROM Players\
        JOIN Locations on Players.currentLocationID = Locations.locationID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }


//renders initial page view
router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deletePlayers.js"];
    var mysql = req.app.get('mysql');
    getQuestandItems(res, mysql, context, complete);
    getPlayerLocations(res, mysql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('search', context);
        }
    }
});
return router;
}();