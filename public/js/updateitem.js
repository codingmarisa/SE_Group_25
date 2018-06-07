function updateitem(loginId, it_item_id){
    $.ajax({
        url: '/inventory/item/' + loginId + '/' + it_item_id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace('/inventory/' + loginId);
        }
    })
};