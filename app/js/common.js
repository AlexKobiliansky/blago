$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    function heightses() {
        if ($(window).width()>=480) {
            $('.cat-item-title').matchHeight({byRow: true,});
            $('.product-item-title').matchHeight({byRow: true,});
            $('.product-item-desc').matchHeight({byRow: true,});
        }
        if ($(window).width()>=391) {
            $('.subcat-item-title').matchHeight({byRow: true,});
        }

    }

    heightses();

    $(window).on('load', function (){
        $(window).resize(function() {
            heightses();
        });

        heightses();
    });

    $('.preloader').fadeOut();

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    $('.products-slider').owlCarousel({
        loop: true,
        nav: true,
        items: 3,
        margin: 30,
        dots: false,
        navText: ['', ''],
        responsive : {
            0 : {
                margin: 10,
                items: 1
            },
            768: {
                items: 2
            },
            992: {
              margin: 15
            },
            1200 : {
                items: 3,
                margin: 30
            }
        }

    });


    $('.product-slider').owlCarousel({
        loop:false,
        nav:false,
        autoHeight: true,
        items: 1,
        thumbs: true,
        dots: false,
        thumbsPrerendered: true,
        thumbItemClass: 'product-nav',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
    });

    $('.product-slider').photoswipe({
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    });

    $('.works-slider').owlCarousel({
        loop:false,
        nav:true,
        items: 1,
        thumbs: true,
        dots: false,
        thumbsPrerendered: true,
        thumbItemClass: 'works-nav',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
        navText: ['', ''],
        responsive : {
            0 : {
                nav: false
            },
            480: {
                nav: true
            }
        }
    });

    $('.spinner-amount').on('click', 'button', function(e){
        var parent = $(this).parents('.spinner-amount');
        var input = parent.find('.amount');
        var amount = input.val();
        var btn = parent.siblings('.btn');

        var product = $(this).parents('.product');
        var cartBtn = product.find('.add_to_cart_button');


        if (!$(this).is('.down')) {
            amount++
        } else {
            if (amount > 1) amount--
        }

        input.val(amount).attr('value', amount);

        cartBtn.attr("data-quantity", amount);
    });

    $('.product-tabs').tabs();


    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $('input[type="checkbox"], select').styler();

    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);
        var t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });



    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [52, 52],
                });

            map.geoObjects.add(myPlacemark);
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }


});
