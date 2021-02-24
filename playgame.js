module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here

//renders initial page view
    function renderPlayGame(req, res){
	var context = {};
	res.render('playgame', context)
    }
	
    router.get('/', renderPlayGame);
	
	return router;
}();