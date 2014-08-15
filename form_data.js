/*
 form_data
 https://github.com/avil13/jQuery-form_data
 */

(function($) {
   $.fn.formData = function(options) {

      if (this === undefined) {
         return ("error");
      }

      var settings = $.extend({
         'select_attr': 'name',
         'textvalue': false,
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

      // callback function
      if (settings.callback) {
         settings.callback(send_obj);
      }

      return send_obj;
   };

})(jQuery);