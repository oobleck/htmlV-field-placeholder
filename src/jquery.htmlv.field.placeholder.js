/**
* @name: htmlV Field Placeholder
* @description: a jQuery Plugin
* @author: Spencer Rhodes (oobleck)
* @url: http://TBD/pluginfile.js
* @documentation: http://TBD/documentation
* @published: 10:43 AM 1/15/2011
* @updated: 10:43 AM 1/15/2011
*
* @notes: 
* Convention *I* use:
*  - $var is a jQuery object
*  - Quote key/value pairs
*  - Use o['key'] syntax when reading key/value
*/
(function($, window, document, undefined) {
    $.fn.placeHolder = function(options) {
        // instead of selecting a static cont with 
        // $("#rating"), we now use the jQuery context
        var cont = this, conf = {},
            settings, init, phShow, phHide, phToggle, dummy;

        // Stop here if the browser supports 'placeholder'
        dummy = document.createElement('input');
        if ('placeholder' in dummy) {return this;}

        settings = $.extend({
            // Defaults
            phClass : 'placeholder',
            phColor : '#aaa'
        }, options);

        conf = {
            idPrefix : 'ph-',
            phClass : settings.phClass
        };

        // The methods
        init = function() {
            $(this).parent('form').css({'position':'relative'});
            cont.each(function() {
                var $this   = $(this), pHolder,
                    fieldId = $this.attr('id') || Math.floor(Math.random()*9999), // see if this can be done smarter with jQ data methods
                    phId    = conf.idPrefix + fieldId;

                    if (!$this.attr('id')) {
                        $(this).attr('id', fieldId);
                    }
                    $('<div class="'+settings.phClass+'" id="'+phId+'">'+$this.attr('placeholder')+'</div>').insertAfter($this);
                    $('#'+phId).css({
                        'position' : 'fixed',
                        'width' : $this.css('width'),
                        'color' : settings.phColor,
                        'backgroundColor' : 'transparent',
                        'paddingLeft'  : $this.css('paddingLeft'),
                        'paddingRight' : $this.css('paddingRight'),
                        'paddingTop'  : $this.css('paddingTop'),
                        'paddingBottom' : $this.css('paddingBottom'),
                        'marginLeft'   : $this.css('marginLeft'),
                        'marginRight'  : $this.css('marginRight'),
                        'marginTop'   : $this.css('marginTop'),
                        'marginBottom'  : $this.css('marginBottom'),
                        'left' : $this.position().left,
                        'top' : $this.position().top
                    });
            });
            conf.initialized = true;
        };
        phShow = function() {
            var $this = $(this),
                id    = $this.attr('id').split(conf.idPrefix)[1] || $this.attr('id');
                
                console.log('showing '+id);
                $('#'+id).show();
        };
        phHide = function() {
            var $this = $(this),
                id    = $this.attr('id').split(conf.idPrefix)[1] || $this.attr('id');
                
                console.log('hiding '+id);
                $('#'+id).hide();
        };
        phToggle = function(el) {
            var $this = $(this),
                fieldId = el.attr('id').split(conf.idPrefix)[1];
            
            if ($('#'+fieldId).val() === '') {
                el.toggle();
            }
        };

        // Events handlers
        $(document).delegate('input[placeholder]', 'blur', function (e) {
            var phElement = $('#'+conf.idPrefix+$(this).attr('id'));
            phToggle(phElement);
        });
        $(document).delegate('input[placeholder]', 'focus', function (e) {
            var phElement = $('#'+conf.idPrefix+$(this).attr('id'));
            phToggle(phElement);
        });
        $(document).delegate('.'+settings.phClass, 'click', function (e) {
            var fieldId = $(this).attr('id').split(conf.idPrefix)[1] || $(this).attr('id');
            //  phHide();
            $('input#'+fieldId).focus();
        });
        
        // Initialize if not already
        if (!conf.initialized) {
            init();
            //console.log('initialized');
        }
        return this;
    };
}(jQuery, this, this.document, false));