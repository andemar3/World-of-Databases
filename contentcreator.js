module.exports = function(){
    var express = require('express');
    var router = express.Router();

//add functions here

//renders initial page view
    function renderContentCreator(req, res){
	var context = {};
	res.render('contentcreator', context)
    }
	
    router.get('/', renderContentCreator);
	
	return router;
}();