;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};

	function encodeForm(t) {
		return Object.keys(t)
			.map(function (key) {
				if (t[key] !== '' && !t[key]) return;
				return encodeURIComponent(key) + '=' + encodeURIComponent(t[key]);
			})
			.filter(function (z) {
				return z;
			})
			.join('&');
	}

	function utf8(str) {
		if (str instanceof Error) return str.message;
		if (typeof str !== 'string') return 'UNKNOWN';
		return str
			.replace(/\\u.{4}/g, function (x) {
				return String.fromCharCode('0x' + x.slice(2));
			})
			.replace(/&#x.*?;/g, function (x) {
				return String.fromCharCode('0x' + x.slice(3, -1));
			})
			.replace(/\\\//g, '/')
			.replace(/\\"/g, '"')
			.replace(/<script((.|\n)*?)\/script>/g, '')
			.replace(/<meta((.|\n)*?)\/>/g, '')
			.replace(/<style((.|\n)*?)\/style>/g, '');
	}


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	Fancybox.bind("[data-fancybox]", {});
	
	var swiper1 = new Swiper(".album-slide", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		autoplay: {
			delay: 3000,
		},
	});

	// ALBUM GALLERIES
// 	$(document).on('click', '.btn-see-more-gallery', function(e){
// 		e.preventDefault();
// 		let indexNumber = $(this).data('index') || 0;
// 		$(this).lightGallery({
// 		thumbnail: true,
// 		dynamic: true,
// 		dynamicEl: photoGalleries,
// 		download: false,
// 		autoplay: true,
// 		preload: 2,
// 		appendSubHtmlTo: '.lg-item',
// 		index: parseInt(indexNumber)
// 		});
// 	});

// 	function sortingGallery() {
// 		if ($(".sortable-gallery .gallery-filters").length) {
// 				var $container = $('.gallery-container');
// 				$container.isotope({
// 						filter:'*',
// 						animationOptions: {
// 								duration: 750,
// 								easing: 'linear',
// 								queue: false,
// 						}
// 				});

// 				$(".gallery-filters li a").on("click", function() {
// 						$('.gallery-filters li .current').removeClass('current');
// 						$(this).addClass('current');
// 						var selector = $(this).attr('data-filter');
// 						$container.isotope({
// 								filter:selector,
// 								animationOptions: {
// 										duration: 750,
// 										easing: 'linear',
// 										queue: false,
// 								}
// 						});
// 						return false;
// 				});
// 		}
// 	}

// 	sortingGallery();

// 	function masonryGridSetting() {
// 		if ($('.masonry-gallery').length) {
// 				var $grid =  $('.masonry-gallery').masonry({
// 						itemSelector: '.grid-item',
// 						columnWidth: '.grid-item',
// 						percentPosition: true
// 				});

// 				$grid.imagesLoaded().progress( function() {
// 						$grid.masonry('layout');
// 				});
// 		}
// }

// 	masonryGridSetting();

	function toggleSuggest(mode) {
		$(".wishes-autocomplete-content").css({'display': mode?'block':'none'});
	}
	$(".hide-autocomplete").click(function (){
		$(".hide-autocomplete").css({'display':'none'});
		$(".show-autocomplete").css({'display':'block'});
		toggleSuggest(false);
	});
	$(".show-autocomplete").click(function (){
		$(".hide-autocomplete").css({'display':'block'});
		$(".show-autocomplete").css({'display':'none'});
		toggleSuggest(true);
	});
	$(".showContent").click(function(e) {e.preventDefault();$("textarea#content").val(e.target.innerText);$(".hide-autocomplete").click();$("textarea#content").focus;});

	$('button.submit_form').click(function (e) {
    e.preventDefault();
		$(e.target).prop( "disabled", true );
    var data = $('#wish-form').serializeArray();
    if (!data[0].value || data[0].value.length < 3 || !data[1].value || data[1].value.length < 10) {
      $('#error').text('Tên quá ngắn hoặc nội dung chưa đủ dài').show();
			$(e.target).prop( "disabled", false );
      setTimeout(function () {
        $('#error').hide();
      }, 3000);
      return;
    }
    fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSejUdhk4JsHfuF6AWtk19WEkVsZfKCsvFgOvI2iz7JTLvEFzA/formResponse',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeForm({
          'entry.1023536172': data[0].value,
          'entry.533895006': utf8(data[1].value),
        }),
        mode: 'no-cors',
      }
    ).then(function () {
      $('#success').text('Gửi lời chúc thành công').show();
			$(e.target).prop( "disabled", false );
      $('.wish-box').prepend(
        '<div class="wish-box-item"><strong>' +
          utf8(data[0].value) +
          '</strong><p>' +
          utf8(data[1].value) +
          '</p></div>'
      );
      setTimeout(function () {
        $('#success').hide();
      }, 3000);
    });
  });

	// function getWishes() {
    // fetch('https://docs.google.com/spreadsheets/d/1cZ3A5DhdtYEjWT6t-eMLN8E7FBYSQDVn_JFI3DhR6zk/gviz/tq')
    //   .then(s => s.text())
    //   .then(t => t.split(/setResponse\(({.*})\);/)[1])
    //   .then(x => JSON.parse(x).table.rows)
    //   .then(wishArr => {
    //     for (var index = 0; index < wishArr.length; index++) {
    //       $('.wish-box').prepend(
    //         '<div class="wish-box-item"><strong>' +
    //           utf8(wishArr[index]['c'][1]['v']) +
    //           '</strong><p>' +
    //           utf8(wishArr[index]['c'][2]['v']) +
    //           '</p></div>'
    //       );
    //     }
    //   });
	// }
	// getWishes();

	
	$(function(){
		mobileMenuOutsideClick();
		parallax();
		//offcanvasMenu();
		//burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
	});


}());
