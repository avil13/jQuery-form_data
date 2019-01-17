jQuery(document).ready(function($) {

    $('#form').submit(function() {

        var data = $('#form').formData({
            callback: function(data) {
                var txt = JSON.stringify(data, undefined, 4);
                $('#cnsle').html(txt);
            }
        });
        return false;
    });


    $('.hider').click(function() {
        var $t = $(this).parent('label').children('input, select, textarea');

        $t.prop('disabled', !$t.prop('disabled'));

        return false;
    });


});