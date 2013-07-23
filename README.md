
author: Kvach

jQuery плагин сбора данных формы в JSON объект, для последующей отправки его AJAX'ом

собрать данные из нескольких форм: 

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
