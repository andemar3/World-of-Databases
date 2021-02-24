module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here

//renders initial page view
    function renderSearch(req, res){
	var context = {};
	res.render('search', context)
    }
	
    router.get('/', renderSearch);
	
	return router;
}();