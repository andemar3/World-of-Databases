module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here
//get all quest with items
	function getQuestandItems(res, mysql, context, complete){
		mysql.pool.query("SELECT questRewardedFrom, itemName FROM Items;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items  = results;
            complete();
        });
    }
	
//get all Quests
	function getQuests(res, mysql, context, complete){
		mysql.pool.query("SELECT questId as id, questName FROM Quests", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.quests  = results;
            complete();
        });
    }

//renders initial page view
    function renderSearch(req, res){
	var context = {};
	res.render('search', context)
    }
	
    router.get('/', renderSearch);
	
	return router;
}();