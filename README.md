###Скрипт для сбора данных из указанной формы###



[Demo](http://avil13.github.io/demo/form_data/ "demo")
===========



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

        var v = $('#frm').formData({
            select_attr : 'name',
            textvalue   : false,
            callback: false
        });

        return false;
    });
});


//собрать данные из нескольких форм
form=$('.form').formData();
form=form.concat($('.second-form').formData());
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


собрать данные из нескольких форм form=formData(form_id1,select_attr1); ``` form=form.concat(formData(form_id2,select_attr2)); ```... form-
массив для post

```html

<form action="" id="frm">
    <input type="text" name="txt">
    <input type="submit" value="Send">
</form>

```


```js

jQuery(document).ready(function($) {
    $('#frm').submit(function(){

        var v = $('#frm').formData({
            select_attr : 'name',
            textvalue   : false,
            callback: false
        });

        return false;
    });
});

```


возвращает объект (ассоциированный массив) для отправки через ajax post данных

* ```select_attr``` атрибут по которому называются поля

* ```textvalue true/false``` если ```true``` берёт текст из выподающего списка, если ```false``` значение.

* ```callback``` Функция которой будет передан объект с данными



В  ```callback```  можно  передать название функции которая будет выполнена с переданным в объектом в виде параметра

К примеру

```js

function log(data){
  console.log( data );
}

$('#frm').formData({
            select_attr : 'name',
            textvalue   : false,
            callback: log
        });
```

* * *

*Thanks for idea, Kvach*
