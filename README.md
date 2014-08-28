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
            callback: false,
            validator: {
                field_name_1: ['required', 'url'],
                field_name_2: ['min:2']
            },
            invalid: function (data) {
                console.log( data );
            }
        });

        return false;
    });
});

```


возвращает объект (ассоциированный массив) для отправки через ajax post данных

* ```select_attr``` атрибут по которому называются поля

* ```textvalue true/false``` если ```true``` берёт текст из выподающего списка, если ```false``` значение.

* ```callback``` Функция которой будет передан объект с данными

* ```validator``` в этот параметр передается объект, описывающий правила, согласно которым нужно проверять созданный плагином объект.

* ```invalid``` функция которая выполняется в случае если валидация не пройдена. Получает объект в качестве ключей которого названия проверяемых полей, а в значениях массив не прошедших проверку методов.


В  ```callback```  можно  передать название функции которая будет выполнена с собранным объектом в виде параметра. Вторым параметром будет передан объект валидации, если она проводилась


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

****
### Валидация

```js

function log(data){
  // если  нполе не прошло валидацию, то вернется {fieldName: ['required', 'url', 'min']}
  if(data.fieldName){
      alert('Поле не прошло  проверку');
  }
}

$('#frm').formData({
            validator: {
                fieldName: ['required', 'url', 'min:2']
            },
            invalid: log
        });
```

#### Доступные правила проверки

|Правило| Описание|
|---|:---|
|required | Поле обязательно должно быть заполнено |
|email | Поле должно быть  валидным  email  адресом|
|phone | Поле должно быть номером телефона, может содержать символы ()-+|
|url | Поле  должно быть  url  адресом|
|alpha | Поле должно содержать только  латинские символы|
|alpha_num | Поле должно содержать  только латинские символы и цифры|
|alpha_dash | Поле должно содержать только латинские символы, цифры, и знаки тире - _|
|len:int1[:int2] | Длинна поля должна быть равна одному из значений переданных в параметрах int1, int2, int3 ... |
|range_len:int1:int2 | Длинна поля должна быть в пределах значения int1 и int2 |
|max:int1 | Значение поля должно быть меньше int1|
|min:int1 | Значение поля должно быть больше int1|
|range:int1:int2 | Значение поля должно быть в пределах int1 и int2 |
|not:val | Поле не должно быть равно значению val |
|is:fieldName | Значение поля должно совпадать со значением fieldName собранного в результате объекта,  может быть использовано для проверки правильности заполнения полей пароля|
|same:fieldName[:fieldName2] | Значение поля должно совпадать со значениями fieldName и fieldName2 ...  собранного в результате объекта,  может быть использовано для проверки правильности заполнения полей пароля|
|diff:fieldName | Значение поля должно отличаться от значения fieldName собранного в результате объекта|

***
### TODO: ###
Сдлеать валидацию в массивах


* * *

*Thanks for idea, Kvach*
