/*
 form_data
 https://github.com/avil13/jQuery-form_data
 v: 0.3
 */

(function($) {
   "use strict";

   $.fn.formData = function(options) {

      if (this === undefined) {
         return ("error");
      }

      var settings = $.extend({
         'select_attr': 'name',
         'textvalue': false,
         'validator': false,
         'invalid': false,
         'callback': false
      }, options);


      var send_obj = {},
         put = function(key, val) {
            if (key.indexOf('[]') > -1 && key[key.length - 1] === ']' && key[key.length - 2] === '[') {
               key = key.replace('[]', '');

               if (send_obj[key] !== undefined && Object.prototype.toString.call(send_obj[key]) === '[object Array]') {
                  send_obj[key].push(val);
               } else {
                  send_obj[key] = [val];
               }
            } else {
               send_obj[key] = val;
            }
         };

      // get text/hidden input and textarea
      var txt = $('textarea:enabled:visible:enabled, input[type=hidden]:enabled, input[type!=checkbox][type!=radio]:enabled:visible', this);

      $.each(txt, function(i, j) {
         if ($(j).attr(settings.select_attr) !== undefined && $(j).not(':disabled')) {
            put($(j).attr(settings.select_attr), $(j).val());
         }
      });


      // get select
      var select = $('select:visible:enabled', this);

      $.each(select, function(i, j) {
         if ($(j).attr(settings.select_attr) !== undefined && $(j).not(':disabled')) {
            if (settings.textvalue === true) {
               put($(j).attr(settings.select_attr), $(j).children("option:selected").text());
            } else {
               put($(j).attr(settings.select_attr), $(j).val());
            }
         }
      });


      // get checkboxes
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

      // get radiobuttons
      var radio = $('input[type=radio]:checked:enabled:visible');

      $.each(radio, function(i, j) {
         put($(j).attr('name'), $(j).attr('value'));
      });

      // validation  ==============================================
      var checkValid = function(val, rule) {

         var re;

         switch (rule) {
            case 'required':
               return !(val === undefined || val.length === 0);

            case 'email':
               re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               return re.test(val);

            case 'phone':
               re = /^\+?[-\(\)\d\s]{5,19}$/;
               return re.test(val);

            case 'url':
               re = /^(https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)*?$/;
               return re.test(val);

            case 'alpha':
               re = /^[a-zA-Z]+$/;
               return re.test(val);

            case 'alpha_num':
               re = /^[a-zA-Z0-9]+$/;
               return re.test(val);

            case 'alpha_dash':
               re = /^[-_a-zA-Z0-9]+$/;
               return re.test(val);
         }

         if (rule.indexOf(':') > -1) {
            rule = rule.split(':');
            switch (rule[0]) {
               case 'len':
                  return rule.slice(1, rule.length).some(function(el) {
                     return val.length == el;
                  });

               case 'range_len':
                  return (val.length >= rule[1] && val.length <= rule[2]);

               case 'max':
                  return val <= rule[1];

               case 'min':
                  return val >= rule[1];

               case 'range':
                  return (val >= rule[1] && val <= rule[2]);

               case 'not':
                  return val != rule[1];

               case 'is':
                  return rule.slice(1, rule.length).some(function(el) {
                     return val == send_obj[el];
                  });

               case 'same':
                  return val == send_obj[rule[1]];

               case 'diff':
                  return val != send_obj[rule[1]];
            }
         }

         return true;
      };

      var inValidEl = {};

      if (settings.validator) {
         for (var k in settings.validator) {
            for (var i = 0; i < settings.validator[k].length; i++) {
               if (!checkValid(send_obj[k], settings.validator[k][i])) {
                  if (inValidEl[k] === undefined)
                     inValidEl[k] = [];
                  inValidEl[k].push(settings.validator[k][i].split(':')[0]);
               }
            }
         }
      }

      if (!$.isEmptyObject(inValidEl) && settings.invalid) {
         settings.invalid(inValidEl);
      }


      // callback function =========================================
      if (settings.callback) {
         inValidEl = $.isEmptyObject(inValidEl) || inValidEl;
         settings.callback(send_obj, inValidEl);
      }

      return send_obj;
   };

})(jQuery);