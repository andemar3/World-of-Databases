module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here

//renders initial page view
    function renderPlayerManager(req, res){
	var context = {};
	res.render('playermanager', context)
    }
	
    router.get('/', renderPlayerManager);
	
	return router;
}();