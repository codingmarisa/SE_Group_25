function updateitem(it_item_id){
    $.ajax({
        url: '/inventory/' + a_acct_id,
        type: 'PUT',
        data: $('#inventory').serialize(),
        success: function(result){
            window.location.replace("/inventory");
        }
    })
};