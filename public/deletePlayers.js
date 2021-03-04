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
