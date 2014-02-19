/*

возвращает объект (ассоциированный массив) для отправки через ajax post данных

select_attr атрибут по которому называются поля
textvalue true/false если true берёт текст из выподающего списка, если false значение.
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

        var txt = $('textarea, input[type=hidden],input[type!=checkbox][type!=radio]:enabled:visible', this);

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


/*
//собрать данные из нескольких форм form=form_data(form_id1,select_attr1); form=form.concat(form_data(form_id2,select_attr2)); ... form- массив для post

<form action="" id="frm">
    <input type="text" name="txt">
    <input type="submit" value="Send">
</form>

<script>

jQuery(document).ready(function($) {
    $('#frm').submit(function(){\

        var v = $('#frm').form_data({
            select_attr : 'name',
            textvalue   : false
        });

        return false;
    });
});

// returned:

</script>
*/
