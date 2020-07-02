let app = {
    init: function() {
        console.log('init');
        // Carousel event
        app.Carousel();

        //Bind event menu
        $('.navbar-toggler').click(app.handleClickOnMenu);
    },

    Carousel : function() {
        var itemsMainDiv = ('.MultiCarousel');
        var itemsDiv = ('.MultiCarousel-inner');
        var itemWidth = "";

        $('.leftLst, .rightLst').click(function () {
            var condition = $(this).hasClass("leftLst");
            if (condition)
                click(0, this);
            else
                click(1, this)
        });

        ResCarouselSize();

        $(window).resize(function () {
            ResCarouselSize();
        });

        //this function define the size of the items
        function ResCarouselSize() {
            var incno = 0;
            var dataItems = ("data-items");
            var itemClass = ('.item');
            var id = 0;
            var btnParentSb = '';
            var itemsSplit = '';
            var sampwidth = $(itemsMainDiv).width();
            var bodyWidth = $('body').width();
            $(itemsDiv).each(function () {
                id = id + 1;
                var itemNumbers = $(this).find(itemClass).length;
                btnParentSb = $(this).parent().attr(dataItems);
                itemsSplit = btnParentSb.split(',');
                $(this).parent().attr("id", "MultiCarousel" + id);

                if (bodyWidth >= 1200) {
                    incno = itemsSplit[3];
                    itemWidth = sampwidth / incno;
                }
                else if (bodyWidth >= 992) {
                    incno = itemsSplit[2];
                    itemWidth = sampwidth / incno;
                }
                else if (bodyWidth >= 768) {
                    incno = itemsSplit[1];
                    itemWidth = sampwidth / incno;
                }
                else {
                    incno = itemsSplit[0];
                    itemWidth = sampwidth / incno;
                }
                $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
                $(this).find(itemClass).each(function () {
                    $(this).outerWidth(itemWidth);
                });

                $(".leftLst").addClass("over");
                $(".rightLst").removeClass("over");

            });
        }

        //this function used to move the items
        function ResCarousel(e, el, s) {
            var leftBtn = ('.leftLst');
            var rightBtn = ('.rightLst');
            var translateXval = '';
            var divStyle = $(el + ' ' + itemsDiv).css('transform');
            var values = divStyle.match(/-?[\d\.]+/g);
            var xds = Math.abs(values[4]);
            if (e == 0) {
                translateXval = parseInt(xds) - parseInt(itemWidth * s);
                $(el + ' ' + rightBtn).removeClass("over");

                if (translateXval <= itemWidth / 2) {
                    translateXval = 0;
                    $(el + ' ' + leftBtn).addClass("over");
                }
            }
            else if (e == 1) {
                var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
                translateXval = parseInt(xds) + parseInt(itemWidth * s);
                $(el + ' ' + leftBtn).removeClass("over");

                if (translateXval >= itemsCondition - itemWidth / 2) {
                    translateXval = itemsCondition;
                    $(el + ' ' + rightBtn).addClass("over");
                }
            }
            $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
        }

        //It is used to get some elements from btn
        function click(ell) {
            var Parent = "#MultiCarousel1";
            var slide = $(Parent).attr("data-slide");
            ResCarousel(ell, Parent, slide);
        }

        // Animation mouseover items carousel
        $(function() {
            var currentTarget;
            $('.item').hover(function(evt) {
            currentTarget = $(evt.currentTarget).find('.description');
            currentTarget.css({'background-position' : '0 100%', 'opacity' : '0.8'});
            }, function() {
            // on mouseout, reset the background position
            currentTarget.css({'background-position' : '', 'opacity' : ''});
            });
        });
    },

    handleClickOnMenu : function(evt) {
        $('.navbar-toggler').off();

        window.setTimeout(function(){
            let navbar = $('body').find('.navbar-collapse');
            let navHeight = $('body').find('.navbar').height();
            $('body').find('.navbar').css('background-color', '#FFFFFF');
                navbar.css({'top' : navHeight + 15 + 'px', 'border-top' : '1px solid #EEEEEE'});
            // Modification logo + icones
            $('body').find('.navbar-brand').html('<img src="img/Logo-c.png" alt>');
            $('body').find('.navbar-toggler-icon').removeClass('nav-ico');
            $('body').find('.navbar-toggler-icon').addClass('nav-ico-c');
            navbar.addClass('show-menu');
            navbar.removeClass('hide-menu');
            $('<div id="menu-is-active">').insertBefore('.navbar');
            $(this).off();

            app.attachDocumentCloseMenuEvent();

        }, 0);

    },

    attachDocumentCloseMenuEvent : function() {
        $(document).click(function (event) {
            if (($(event.target).closest("#menu-is-active").length) || ($(event.target).closest(".nav-ico-c").length)) {
                $('body').find('.navbar-brand').html('<img src="img/Logo.png" alt>');
                $('body').find('.navbar-toggler-icon').removeClass('nav-ico-c');
                $('body').find('.navbar-toggler-icon').addClass('nav-ico');
                $('body').find('#menu-is-active').remove();
                $('body').find('.navbar').css('background-color', '');
                $('body').find('.navbar-collapse').css({'top' : '', 'border-top' : ''});
                $(this).off();
                $(".navbar-collapse").removeClass('show');
                $(".navbar-collapse").removeClass('show-menu');
                $(".navbar-collapse").addClass('hide-menu');
                $('.navbar-ico-c').off();
                $('.navbar-toggler').click(app.handleClickOnMenu); 
                
            }         
        });
    }
};

$(app.init);