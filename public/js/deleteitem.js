function deleteitem(aid, iid){
    $.ajax({
        url: '/inventory/deleteitem/' + aid + '/' + iid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};