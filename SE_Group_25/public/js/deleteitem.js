function deleteitem(id){
    $.ajax({
        url: '/inventory/item' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};