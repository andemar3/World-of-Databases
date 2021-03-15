module.exports = function(){
    var express = require('express');
    var router = express.Router();

//get all Locations
	function getLocations(res, mysql, context, complete){
		mysql.pool.query("SELECT locationID, locationName FROM Locations", function(error, results, fields){
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
		mysql.pool.query("SELECT questID, questName FROM Quests", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.quests  = results;
            complete();
        });
    }
	
	function getItemlessQuests(res, mysql, context, complete){
		mysql.pool.query("SELECT Quests.questID, Quests.questName FROM Quests WHERE Quests.questID NOT IN (SELECT Items.questRewardedFrom FROM Items JOIN Quests ON Quests.questID = Items.questRewardedFrom)", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.itemlessQuests  = results;
			console.log(context.itemlessQuests);	
            complete();
        });
    }
	
//get all Items
	function getItems(res, mysql, context, complete){
		mysql.pool.query("SELECT itemID, itemName FROM Items", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
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
		if(req.body.questLocation == "NULL"){
			req.body.questLocation = null;
		}
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
		if(req.body.questRewardedFrom == "NULL"){
			req.body.questRewardedFrom = null;
		}
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

//handles deleting a Location
	router.delete('/location/:locationID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Locations WHERE locationID = ?";
        var inserts = [req.params.locationID];
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
	
//handles deleting a Quest
	router.delete('/quest/:questID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Quests WHERE questID = ?";
        var inserts = [req.params.questID];
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
	
//handles deleting an Item
	router.delete('/item/:itemID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Items WHERE itemID = ?";
        var inserts = [req.params.itemID];
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
	
//renders initial page view
    function renderContentCreator(req, res){
	var context = {};
	context.jsscripts = ["deleteContent.js"];
	var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
		//get Locations, Quests, and Items for dropdowns
        getLocations(res, mysql, context, complete);
        getQuests(res, mysql, context, complete);
		getItems(res, mysql, context, complete);
		getItemlessQuests(res, mysql, context, complete);

		//render page when getLocations and getQuests have finished
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
				console.log(context);
                res.render('contentcreator', context);
            }
		}
	}
	
    router.get('/', renderContentCreator);
	
	return router;
}();