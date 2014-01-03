/* - BASE HTML TEMPLATE
------------------------------------------------- 
	Description: JS Scripts
	Author:Shane Prendergast
	Author URL:http://www.webknit.co.uk
	Template URL:http://base.webknit.co.uk/
*/


// Creating Namespace 
//**************************
var ImageIn = ImageIn || {};

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.1
 *
 */
 
// This is the lazy load script inside out lazyLoad function for more information on this please visit http://www.appelsiini.net/projects/lazyload
//*****************************
ImageIn.lazyLoad = function()
{	

	(function($, window, document, undefined) {
	    var $window = $(window);
	
	    $.fn.lazyload = function(options) {
	        var elements = this;
	        var $container;
	        var settings = {
	            threshold       : 0,
	            failure_limit   : 0,
	            event           : "scroll",
	            effect          : "show",
	            container       : window,
	            data_attribute  : "original",
	            skip_invisible  : true,
	            appear          : null,
	            load            : null,
	            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
	        };
	
	        function update() {
	            var counter = 0;
	
	            elements.each(function() {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) ||
	                    $.leftofbegin(this, settings)) {
	                        /* Nothing. */
	                } else if (!$.belowthefold(this, settings) &&
	                    !$.rightoffold(this, settings)) {
	                        $this.trigger("appear");
	                        /* if we found an image we'll load, reset the counter */
	                        counter = 0;
	                } else {
	                    if (++counter > settings.failure_limit) {
	                        return false;
	                    }
	                }
	            });
	
	        }
	
	        if(options) {
	            /* Maintain BC for a couple of versions. */
	            if (undefined !== options.failurelimit) {
	                options.failure_limit = options.failurelimit;
	                delete options.failurelimit;
	            }
	            if (undefined !== options.effectspeed) {
	                options.effect_speed = options.effectspeed;
	                delete options.effectspeed;
	            }
	
	            $.extend(settings, options);
	        }
	
	        /* Cache container as jQuery as object. */
	        $container = (settings.container === undefined ||
	                      settings.container === window) ? $window : $(settings.container);
	
	        /* Fire one scroll event per scroll. Not one scroll event per image. */
	        if (0 === settings.event.indexOf("scroll")) {
	            $container.bind(settings.event, function() {
	                return update();
	            });
	        }
	
	        this.each(function() {
	            var self = this;
	            var $self = $(self);
	
	            self.loaded = false;
	
	            /* If no src attribute given use data:uri. */
	            if ($self.attr("src") === undefined || $self.attr("src") === false) {
	                if ($self.is("img")) {
	                    $self.attr("src", settings.placeholder);
	                }
	            }
	
	            /* When appear is triggered load original image. */
	            $self.one("appear", function() {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .bind("load", function() {
	
	                            var original = $self.attr("data-" + settings.data_attribute);
	                            $self.hide();
	                            if ($self.is("img")) {
	                                $self.attr("src", original);
	                            } else {
	                                $self.css("background-image", "url('" + original + "')");
	                            }
	                            $self[settings.effect](settings.effect_speed);
	
	                            self.loaded = true;
	
	                            /* Remove image from array so it is not looped next time. */
	                            var temp = $.grep(elements, function(element) {
	                                return !element.loaded;
	                            });
	                            elements = $(temp);
	
	                            if (settings.load) {
	                                var elements_left = elements.length;
	                                settings.load.call(self, elements_left, settings);
	                            }
	                        })
	                        .attr("src", $self.attr("data-" + settings.data_attribute));
	                }
	            });
	
	            /* When wanted event is triggered load original image */
	            /* by triggering appear.                              */
	            if (0 !== settings.event.indexOf("scroll")) {
	                $self.bind(settings.event, function() {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });
	
	        /* Check if something appears when window is resized. */
	        $window.bind("resize", function() {
	            update();
	        });
	
	        /* With IOS5 force loading images when navigating with back button. */
	        /* Non optimal workaround. */
	        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
	            $window.bind("pageshow", function(event) {
	                if (event.originalEvent && event.originalEvent.persisted) {
	                    elements.each(function() {
	                        $(this).trigger("appear");
	                    });
	                }
	            });
	        }
	
	        /* Force initial check if images should appear. */
	        $(document).ready(function() {
	            update();
	        });
	
	        return this;
	    };
	
	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */
	
	    $.belowthefold = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top + $(settings.container).height();
	        }
	
	        return fold <= $(element).offset().top - settings.threshold;
	    };
	
	    $.rightoffold = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left + $(settings.container).width();
	        }
	
	        return fold <= $(element).offset().left - settings.threshold;
	    };
	
	    $.abovethetop = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top;
	        }
	
	        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
	    };
	
	    $.leftofbegin = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left;
	        }
	
	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };
	
	    $.inviewport = function(element, settings) {
	         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
	                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	     };
	
	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() or */
	    /* $("img").filter(":below-the-fold").something() which is faster */
	
	    $.extend($.expr[":"], {
	        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
	        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
	        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
	        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
	        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
	        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
	        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
	    });
	
	})(jQuery, window, document);
	
	// Activate lazy load on images with the Class lazy
	$("img.lazy").lazyload();
};


/*
 * ImageIn
 *
 * Copyright (c) Webknit
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.imagein.webknit.co.uk
 *
 *
 */ 

// The detect Retina script
//*****************************
ImageIn.retinaDetect = function()
{	
	// Detect pixel ratio, the code below is anything over 1
	var retina = window.devicePixelRatio > 1;
	
	// This tells the script that the images we need to use ImageIn on have a class of "lazy"
	var retinaImage = $('.lazy');

	function init()
	{
		// Detect those screens
		detect();
	}
	
	function detect()
	{
		// If we have a retina screen
		if (retina) { 	
		
	    	retinaImage.each(function(index, element) {
	    		// select each image using the js 'this' keyword
		        var img = $(this);
		        
		        // Add a class to the body, could be useful for future development
		        $('body').addClass('retina-detected');
		        
		        // Swap the data-original image paths for the @2x image
		        img.attr('data-original', img.attr('data-original').replace('.jpg', '@2x.jpg'));
		        img.attr('data-original', img.attr('data-original').replace('.png', '@2x.png'));
		    });
		}
		// If we don't detect anything then add a class to the body 
		else {
			
			$('body').addClass('retina-not-detected');
		}
	}

	init();
};

// ON DOC READY
$(function()
{	
	// Run the lazyload
	new ImageIn.lazyLoad();
	
	// Run the retina detect
	new ImageIn.retinaDetect();
	
});

