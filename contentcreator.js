module.exports = function(){
    var express = require('express');
    var router = express.Router();

//get all Locations
	function getLocations(res, mysql, context, complete){
		mysql.pool.query("SELECT locationId as id, locationName FROM Locations", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations  = results;
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

//insert new Location
	router.post('/location', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Locations (locationName) VALUES (?)";
        var inserts = [req.body.locationName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/contentcreator');
            }
        });
    });
	
//insert new Quest
	router.post('/quest', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Quests (questName, questLocation, statRequired, statMinimum) VALUES (?, ?, ?, ?)";
        var inserts = [req.body.questName, req.body.questLocation, req.body.statRequired, req.body.statMinimum];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/contentcreator');
            }
        });
    });
	
//insert new Item
	router.post('/item', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Items (itemName, questRewardedFrom, statBoosted, statBoostAmount) VALUES (?, ?, ?, ?)";
        var inserts = [req.body.itemName, req.body.questRewardedFrom, req.body.statBoosted, req.body.statBoostAmount];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/contentcreator');
            }
        });
    });


//renders initial page view
    function renderContentCreator(req, res){
	var context = {};
	var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
		//get Locations and Quests for dropdowns
        getLocations(res, mysql, context, complete);
        getQuests(res, mysql, context, complete);
		//render page when getLocations and getQuests have finished
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('contentcreator', context);
            }
		}
	}
	
    router.get('/', renderContentCreator);
	
	return router;
}();