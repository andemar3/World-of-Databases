function deletePlayer(){
	var selection = document.getElementById("playerDelete");
	var playerID = selection.value;
    $.ajax({
        url: '/playermanager/' + playerID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deletePlayerItem(playerID){
	var selection = document.getElementById("playerItemDelete" + playerID);
	var itemID = selection.value
	$.ajax({
		url: '/playermanager/playerID/' + playerID + '/itemID/' + itemID,
		type: 'DELETE',
		success: function(result){
			if(result.responseText != undefined){
				alert(result.responseText)
			}
			else {
				window.location.reload(true)
			} 
		}
	})
};