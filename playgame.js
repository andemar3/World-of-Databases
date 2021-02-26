module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here
	function getTable(res, mysql, context, complete){
		mysql.pool.query("SELECT Players.playerName, Locations.locationName, Items.itemName FROM Players JOIN PlayersItems on PlayersItems.playerID = Players.playerID JOIN Locations on Locations.locationID = Players.currentLocationID JOIN Items on Items.itemID = PlayersItems.itemID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations  = results;
            complete();
        });
    }
//renders initial page view
    function renderPlayGame(req, res){
	var context = {};
	res.render('playgame', context)
    }
	
    router.get('/', renderPlayGame);
	
	return router;
}();