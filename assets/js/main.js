(function () {
  var app = app || {};

  var spBreak = 767.98;
  var offsetY = window.pageYOffset;
  var menuOpen = false;

  app.init = function () {
    app.detectBrowsers();
    app.tabletViewport();
    app.smoothScroll();
    app.initWow();
    app.toggleMenu();
    app.slider();
    app.scrollLeft();
    app.appearMenu();
  };
  app.appearMenu = function () {
    if (!$('.js-appear-menu').length) return;
    if (!app.isMobile()) {
      var headerShow = function () {
        if (menuOpen) return;
        if ($(window).scrollTop() > $('.js-appear-menu').height() - 162) {
          $('header').fadeIn();
        } else {
          $('header').fadeOut();
        }
      };
      headerShow();
      $(window).on('load scroll resize rotate', headerShow);
    }
  };

  app.scrollLeft = function () {
    if (!$('.js-scroll-left').length) return;
    $(window).on('load scroll resize', function () {
      var winLeft = $(window).scrollLeft();
      $('.js-scroll-left').css('margin-left', -winLeft + 'px');
    });
  };

  app.closeMenu = function () {
    $('.js-navigation').fadeOut(300);
    $('.js-menu-overlay').hide();
    $('body').removeClass('has-menu');
    $('.js-button-menu').removeClass('is-active');
    $(window).scrollTop(offsetY);
    menuOpen = false;
  };

  app.openMenu = function () {
    offsetY = window.pageYOffset;
    $('body').css({
      top: -offsetY + 'px'
    });
    $('.js-navigation').fadeIn(300);
    $('body').addClass('has-menu');
    $('.js-menu-overlay').show();
    menuOpen = true;
  };

  app.toggleMenu = function () {
    $('.js-button-menu').click(function () {
      $(this).toggleClass('is-active');
      if ($(this).hasClass('is-active')) {
        app.openMenu();
      } else {
        app.closeMenu();
      }
      return false;
    });

    $('.js-menu-overlay').click(function () {
      app.closeMenu();
      return false;
    });
  };

  app.isMobile = function () {
    return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;
  };
  app.slider = function () {
    if (!$('.js-slider').length) return;
    var duplicateSlide = function (slider, multiply) {
      var sliderWrapper = $(slider).find('.swiper-wrapper');
      var sliderWrapperHTML = sliderWrapper.html();
      for (var i = 0; i < multiply; i++) {
        sliderWrapper.append(sliderWrapperHTML);
      }
    };
    duplicateSlide('.js-slider', 2);
    new Swiper('.js-slider', {
      speed: 7000,
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      disableOnInteraction: true,
      autoplay: {
        delay: 0
      }
    });
  };
  app.detectBrowsers = function () {
    var html = $('html');
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('mac') >= 0) {
      html.addClass('is-mac');
    }
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        html.addClass('is-chrome');
      } else {
        html.addClass('is-safari');
      }
    }
    if (ua.indexOf('msie ') > -1 || ua.indexOf('trident/') > -1) {
      html.addClass('is-ie');
    }
    if (ua.indexOf('firefox') > -1) {
      html.addClass('is-firefox');
    }
    if (ua.indexOf('android') > -1) {
      html.addClass('is-android');
    }
    if (ua.match(/(iphone|ipod|ipad)/)) {
      html.addClass('is-ios');
    }
    if (ua.indexOf('edg/') > -1) {
      html.removeClass('is-chrome');
      html.addClass('is-chromium');
    }
  };

  app.tabletViewport = function () {
    var viewport = document.getElementById('viewport');
    var viewportSet = function () {
      var portrait = window.matchMedia('(orientation: portrait)').matches;
      if (screen.width < 375 && portrait) {
        viewport.setAttribute('content', 'width=375, user-scalable=0');
      } else if ((screen.width >= 768 && screen.width <= 1199) ||
        (screen.width < 768 && screen.height >= 768 && !portrait)) {
        viewport.setAttribute('content', 'width=1300, user-scalable=0');
        var ua = navigator.userAgent.toLowerCase();
        if ((/macintosh/i.test(ua) &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 1) ||
          (ua.match(/(iphone|ipod|ipad)/) && !app.isMobile()) ||
          (ua.indexOf('android') > -1 && !app.isMobile())) {
          $('html').addClass('is-tablet');
        }
      } else {
        viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0'
        );
        $('html').removeClass('is-tablet');
      }
    };
    viewportSet();
    window.onload = function () {
      viewportSet();
    };
    window.onresize = function () {
      viewportSet();
    };
  };

  app.smoothScroll = function () {
    var anchors = $('a[href*="#"]:not([href="#"])');
    var headerHeight = $('header').height() + 20;
    var speed = 500;
    var timeDelay = 0;
    var triggerScroll = function (context) {
      var href = typeof context == 'string' ?
        context :
        '#' +
        $(context)
          .attr('href')
          .split('#')[1];
      if ($(context).hasClass('no-scroll')) return;
      if (!$(href).length) return;
      if ($('body').hasClass('has-menu')) {
        app.closeMenu();
        timeDelay = 300;
      }
      setTimeout(function () {
        var position = $(href).offset().top - headerHeight * 1.5;
        $('body, html').animate({
          scrollTop: position
        }, speed, 'swing');
      }, timeDelay);
      return false;
    };
    setTimeout(function () {
      scroll(0, 0);
      $('html')
        .removeClass('is-loading')
        .addClass('is-visible');
    }, 1);
    if (window.location.hash) {
      scroll(0, 0);
      var timeout = 500;
      if (navigator.userAgent.indexOf('MSIE ') > -1 ||
        navigator.userAgent.indexOf('Trident/') > -1) {
        timeout = 0;
      }
      setTimeout(function () {
        triggerScroll(window.location.hash);
      }, timeout);
    }
    anchors.on('click', function () {
      return triggerScroll(this);
    });
  };

  app.initWow = function () {
    if ($('.wow').length) {
      new WOW().init();
    }
  };

  $(function () {
    app.init();
  });
})();
