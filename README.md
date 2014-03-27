###Скрипт для сбора данных из указанной формы###


    

__HTML__

```html
<form action="" id="frm">
    <input type="text" name="txt">
    <input type="text" name="txt2">
    <input type="submit" value="Send">
</form>
```

__JS__

```js 
// Работа с плагином
 jQuery(document).ready(function($) {
    $('#frm').submit(function(){\

        var v = $('#frm').form_data({
            select_attr : 'name',
            textvalue   : false
        });

        return false;
    });
});


//собрать данные из нескольких форм 
form=form_data(form_id1,select_attr1); 
form=form.concat(form_data(form_id2,select_attr2)); 
... 
form- массив для post
```


 _получаем объект для передачи методом POST
 вида:_

```json
 {
    txt:  "Значение поля 1",
    txt2: "Значение поля 2"
 }
```

*Thanks for idea, Kvach*
