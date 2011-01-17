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
        var cont = this, config,
            init, phShow, phHide, phToggle, dummy;

        // Stop here if the browser supports 'placeholder'
        dummy = document.createElement('input');
        if ('placeholder' in dummy) {return this;}

        config = $.extend({
            // Defaults
            css : {
                //outline : '1px solid red',
                color : '#aaa',
                position : 'absolute',
                background : 'transparent',
                overflow : 'hidden'
            },
            phClass : 'placeholder',
            idPrefix : 'ph-',
            useLabels : true,
            ifBrowserSupportsPh : false,
            initialized : false
        }, options);

        // The methods
        init = function() {
            cont.each(function() {
                var $this   = $(this), pHolder,
                    fieldId = $this.attr('id') || Math.floor(Math.random()*9999), // see if this can be done smarter with jQ data methods
                    fieldLabel = $('label[for='+fieldId+']'),
                    phId    = config.idPrefix + fieldId,
                    ph      = (config['useLabels']) ? 'label' : 'div',
                    phText  = $this.attr('placeholder') || fieldLabel.text();

                    //$this.parent().css({'position':'relative'});
                    pHolder = $('<'+ph+' class="'+config.phClass+'" id="'+phId+'">'+phText+'</'+ph+'>').insertAfter($this);

                    pHolder.css($.extend({
                        'width' : $this.css('width'),
                        'height' : $this.css('height'),
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
                    }, config.css));
                    config['useLabels'] && pHolder.attr('for', fieldId);
                    !$this.attr('id') && $(this).attr('id', fieldId);
            });
            config.initialized = true;
        };
        phShow = function(el) {
            var $this = $(this),
                fieldId = el.attr('id').split(config.idPrefix)[1];
            
            !$('#'+fieldId).val() && el.show();
        };
        phHide = function(el) {
            var $this = $(this),
                fieldId = el.attr('id').split(config.idPrefix)[1];
            
            !$('#'+fieldId).val() && el.hide();
        };

        // Events handlers
        $(document).delegate('input', 'blur', function (e) {
            var phElement = $('#'+config.idPrefix+$(this).attr('id'));
            phShow(phElement);
        });
        $(document).delegate('input', 'focus', function (e) {
            var phElement = $('#'+config.idPrefix+$(this).attr('id'));
            phHide(phElement);
        });
        if (!config['useLabels']) {
            $(document).delegate('.'+config.phClass, 'click', function (e) {
                var fieldId = $(this).attr('id').split(config.idPrefix)[1] || $(this).attr('id');
                $('input#'+fieldId).focus();
            });
        }
        
        // Initialize if not already
        !config.initialized && init();
        return this;
    };
}(jQuery, this, this.document, false));