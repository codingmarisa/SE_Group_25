function updateitem(item_id){
    $.ajax({
        url: '/inventory/item/' + item_id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/inventory");
        }
    })
};