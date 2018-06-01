function removeitem(id){
    $.ajax({
        url: '/inventory/contents' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};