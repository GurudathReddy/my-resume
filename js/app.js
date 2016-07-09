/* Functions */

/* Make image as full screen */
function _expandToFullScreenImage() {
    $('#homeFullScreen').css({height: $(window).height()})
}

/* Page Load Events */
/* After document is ready */
$(document).ready(function () {
    "use strict";

    if ($('#homeFullScreen').length) {
        _expandToFullScreenImage();
    }

    $(window).scroll(function () {
        if ($('#fullScreen').length) {
            if ($(window).scrollTop() > 500) {
                $('#mainHeader').slideDown();
            }
            else if ($(window).scrollTop() == 0) {
                $('#mainHeader').slideUp();
            }
        }
    });

    if ($("a.image-link").length) {
        $("a.image-link").click(function (e) {
            var items = [];
            items.push({ src: $(this).attr('href')  });
            if ($(this).data('gallery')) {
                var $arraySrc = $(this).data('gallery').split(',');
                $.each($arraySrc, function (i, v) {
                    items.push({
                        src: v
                    });
                });
            }
            $.magnificPopup.open({
                type: 'image',
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true
                }
            });
            e.preventDefault();
        });
    }

    if ($("a.image-iframe").length) {
        $('a.image-iframe').magnificPopup({type: 'iframe', mainClass: 'mfp-fade'});
    }

    /* Owl Carousel */
    if ($('#portfolio-carousel').length) {
        $("#portfolio-carousel").owlCarousel();
    }

    /* Flexslider */
    if ($('#flexHome').length) {

        $('#flexHome').flexslider({
            animation: "slide",
            controlNav: true,
            directionNav: false,
            touch: true,
            direction: "vertical",
            slideshowSpeed: 3000
        });
    }

    /* Rolling Effects */
    if ($('.imgHover').length) {

        $('.imgHover article').hover(
            function () {
                var $this = $(this);
                var fromTop = ($('.imgWrapper', $this).height() / 2 - $('.iconLinks', $this).height() / 2);
                $('.iconLinks', $this).css('margin-top', fromTop);
                $('.mediaHover', $this).height($('.imgWrapper', $this).height());
                $('.mask', this).css('height', $('.imgWrapper', this).height());
                $('.mask', this).css('width', $('.imgWrapper', this).width());
                $('.mask', this).css('margin-top', $('.imgWrapper', this).height());
                $('.mask', this).stop(1).show().css('margin-top', $('.imgWrapper', this).height()).animate({marginTop: 0}, 200, function () {
                    $('.iconLinks', $this).css('display', 'block');
                    if (Modernizr.csstransitions) {
                        $('.iconLinks a').addClass('animated');
                        $('.iconLinks a', $this).removeClass('flipOutX');
                        $('.iconLinks a', $this).addClass('bounceInDown');
                    } else {
                        $('.iconLinks', $this).stop(true, false).fadeIn('fast');
                    }
                });
            }, function () {
                var $this = $(this);
                $('.mask', this).stop(1).show().animate({marginTop: $('.imgWrapper', $this).height()}, 200, function () {
                    if (Modernizr.csstransitions) {
                        $('.iconLinks a', $this).removeClass('bounceInDown');
                        $('.iconLinks a', $this).addClass('flipOutX');

                    } else {
                        $('.iconLinks', $this).stop(true, false).fadeOut('fast');
                    }
                });
            });
    }

    /* Portfolio Sheet */
    $(".portfolioSheet").pageslide({
        direction: "left",
        modal: true,
        iframe: false,
        speed: "250"
    });

    /* Autoclose Menu */
    $('.nav a').on('click', function () {

        if ($('.navbar-toggle').css('display') != 'none')
            $('.navbar-toggle').click();

    });
});

/* Window onload (after all resources are loaded) */
$(window).load(function () {

    "use strict";

    //$('#status').fadeOut();
    $('#status').delay(1550).fadeOut('slow');// will first fade out the loading animation
    $('#preloader').delay(1800).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(1350).css({'overflow': 'visible'});

    /* Isotope Filtering */
    if ($('.isotopeWrapper').length) {

        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope

        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }
        });
        var rightHeight = $('#works').height();
        $('#filter a').click(function () {


            $('#works').height(rightHeight);
            $('#filter a').removeClass('current');


            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });

        $(window).smartresize(function () {
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
    }

    /** PROCESS ICONS **/
    $('.iconBoxV3 a').hover(function () {

        if (Modernizr.csstransitions) {

            $(this).stop(false, true).toggleClass('hover', 150);
            $('i', this).css('-webkit-transform', 'rotateZ(360deg)');
            $('i', this).css('-moz-transform', 'rotateZ(360deg)');
            $('i', this).css('-o-transform', 'rotateZ(360deg)');
            $('i', this).css('transform', 'rotateZ(360deg)');
        } else {
            $(this).stop(false, true).toggleClass('hover', 150);
        }
    }, function () {
        if (Modernizr.csstransitions) {
            $(this).stop(false, true).toggleClass('hover', 150);
            $('i', this).css('-webkit-transform', 'rotateZ(0deg)');
            $('i', this).css('-moz-transform', 'rotateZ(0deg)');
            $('i', this).css('-o-transform', 'rotateZ(0deg)');
            $('i', this).css('transform', 'rotateZ(0deg)');
        } else {
            $(this).stop(false, true).toggleClass('hover', 150);
        }
    });

    if ($('.scrollMenu').length) {
        if ($('.localscroll').length) {
            $('.localscroll').localScroll({
                lazy: true,
                offset: {
                    top: -67
                }
            });
        }

        var isMobile = false;
        if (Modernizr.mq('only all and (max-width: 1024px)')) {
            isMobile = true;
        }

        if (isMobile === false && ($('#paralaxSlice1').length || isMobile === false && $('#paralaxSlice2').length )) {
            $(window).stellar({
                horizontalScrolling: false,
                responsive: true/*,
                 scrollProperty: 'scroll',
                 parallaxElements: false,
                 horizontalScrolling: false,
                 horizontalOffset: 0,
                 verticalOffset: 0*/
            });
        }
    }
});

/* Window resize */
$(window).on("resize", function (e) {
    if ($('#fullScreen').length) {
        _expandToFullScreenImage();
    }
});

         







