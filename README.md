/*
собрать данные из нескольких форм form=form_data(form_id1,select_attr1); form=form.concat(form_data(form_id2,select_attr2)); ... form- массив для post
*/

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
