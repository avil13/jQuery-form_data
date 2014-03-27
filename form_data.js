/*
form_data
https://github.com/avil13/jQuery-form_data
*/

(function($) {
    $.fn.form_data = function(options) {

        if (this === undefined) {
            return ("error");
        }


        var settings = $.extend({
            'select_attr': 'name',
            'textvalue': false
        }, options);


        var send_obj = {};

        var txt = $('textarea:enabled:visible, input[type=hidden]:enabled, input[type!=checkbox][type!=radio]:enabled:visible', this);

        $.each(txt, function(i, j) {
            if ($(j).attr(settings.select_attr) !== undefined && $(j).not(':disabled')) {
                send_obj[$(j).attr(settings.select_attr)] = $(j).val();
            }
        });

        var select = $('select:visible', this);

        $.each(select, function(i, j) {
            if ($(j).attr(settings.select_attr) !== undefined && $(j).not(':disabled')) {
                if (settings.textvalue === true) {
                    send_obj[$(j).attr(settings.select_attr)] = $(j).children("option:selected").text();
                } else {
                    send_obj[$(j).attr(settings.select_attr)] = $(j).val();
                }
            }
        });

        var checkBox = $('input[type=checkbox]:enabled:visible');

        $.each(checkBox, function(i, j) {
            var Name = $(j).attr('name');

            if (send_obj[Name] === undefined) {
                send_obj[Name] = [];
            }

            if ($(j).prop('checked') === true) {
                send_obj[Name].push($(j).attr('value'));
            }

        });

        var radio = $('input[type=radio]:checked:enabled:visible');

        $.each(radio, function(i, j) {
            send_obj[$(j).attr('name')] = $(j).attr('value');
        });


        return send_obj;
    };

})(jQuery);

