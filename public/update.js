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