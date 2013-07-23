/**

author: Kvach

возвращает объект (ассоциированный массив) для отправки через ajax post данных

select_attr атрибут по которому называются поля
textvalue true/false если true берёт текст из выподающего списка, если false значение.
*/

(function($){
   $.fn.form_data = function( options ){

        if ( this === undefined) {
            return("error");
        }


        var settings = $.extend( {
            'select_attr' : 'name',
            'textvalue'   : false
        }, options);


        var send_obj={};

        var txt = $('input, textarea', this);

        txt.each(function(){
            if ($(this).attr(settings.select_attr)!== undefined) {
                send_obj[$(this).attr(settings.select_attr)]=$(this).val();
            }
        });

        var select = $('select', this);

        select.each(function(){
            if ($(this).attr(settings.select_attr)!== undefined) {
                if (settings.textvalue===true) {
                    send_obj[$(this).attr(settings.select_attr)]=$(this).children("option:selected").text();
                }else{
                    send_obj[$(this).attr(settings.select_attr)]=$(this).val();
                }
            }
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