function updatelocation(playerID){
    //var selection = document.getElementById("update-location");
	//var locationID = selection.value;
    $.ajax({
        url: '/playgame/' + playerID,
        type: 'PUT',
        data: $('#update-location').serialize(),
        success: function(result){
            window.location.reload(true);
        }
    })
};

function completequest(playerID){
    $.ajax({
        url: '/playgame/completequest/' + playerID,
        type: 'PUT',
        data: $('#complete-quest').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};