function deleteLocation(){
	var selection = document.getElementById("locationDelete");
	var locationID = selection.value;
    $.ajax({
        url: '/contentcreator/location/' + locationID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteQuest(){
	var selection = document.getElementById("questDelete");
	var questID = selection.value;
    $.ajax({
        url: '/contentcreator/quest/' + questID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteItem(){
	var selection = document.getElementById("itemDelete");
	var itemID = selection.value;
    $.ajax({
        url: '/contentcreator/item/' + itemID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};