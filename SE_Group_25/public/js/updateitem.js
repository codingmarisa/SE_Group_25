function updateitem(it_item_id){
    $.ajax({
        url: '/inventory/item/' + it_item_id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/inventory");
        }
    })
};