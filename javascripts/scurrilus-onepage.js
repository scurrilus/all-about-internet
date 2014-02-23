// Scroll Settings
//Jquery Easing Plugin Methodes - http://api.jqueryui.com/easings/ (easeOutBack, ...)
var scrollSpeed = 600;
var lockedTime = 100;
var scrollEasingDown = 'swing';
var scrollEasingUp = 'swing';
var duration = 20;

// Global Settings
count = null;
windowH = null;
windowW = null;

setTimeout(function() {
	for ( i = 0; i <= count; i++) {
		$('nav ul').append('<li></li>');
		$('#bullets ul').append('<li><div class="bulletNote">hi</div></li>');
	}

	$('#content section:first').addClass('active');
	$('nav ul li:first').addClass('active');
	$('#bullets ul li:first').addClass('active');
	$( "<div id='locked'></div>" ).insertAfter('footer');
	buttonActions();
}, 100);

function scurrilus_onepagescroll() {

	init();

	var lastScrollTop = 0;

	$('#content').scroll(function() {
		var st = $(this).scrollTop();
		if (st > lastScrollTop) {
			scroll('down');
		} else {
			scroll('up');
		}
		lastScrollTop = st;
	});

	$("section.active").on("touchend", function(e) {
		setInterval(function(event) {
			var activeSectionHeight = $('section.active')[0].scrollHeight;
			var st = $('section.active').scrollTop();
			
			// Add Touchscroll
			if ((st < (activeSectionHeight - windowH - 1) && st > 50)) {
				if (!$('section.active').hasClass('touchScroll')) {
					$('section.active').addClass('touchScroll');
				}
			}

			// Remove Touchscroll
			if ((st < 50) || (st > (activeSectionHeight - windowH - 50))) {
				if ($('section.active').hasClass('touchScroll')) {
					$('section.active').removeClass('touchScroll');
				}
			}
			event.stopPropagation();
		}, 100);

	});

	var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	windowW = windowWidth;

	if (windowW <= 768) {
		$('nav').removeClass('break320');
		$('nav').addClass('break768');
		$('section').removeClass('break320');
		$('section').addClass('break768');
		$('#bullets').removeClass('break320');
		$('#bullets').addClass('break768');
	}

	if (windowW <= 320) {
		$('nav').removeClass('break768');
		$('nav').addClass('break320');
		$('section').removeClass('break768');
		$('section').addClass('break320');
		$('#bullets').removeClass('break768');
		$('#bullets').addClass('break320');
	}

	if (windowW > 768) {
		$('nav').removeClass('break768');
		$('nav').removeClass('break320');
		$('section').removeClass('break768');
		$('section').removeClass('break320');
		$('#bullets').removeClass('break768');
		$('#bullets').removeClass('break320');
	}
}

function init() {
	var sectionCount = $('#content section').length;
	var headerHeight = $('header').height();
	var windowHeight = $(window).height();
	var setWindowHeight = windowHeight + 'px';

	count = sectionCount;
	windowH = windowHeight;

	$('#content section').css('height', setWindowHeight);
	$('#content').css('height', setWindowHeight);

	setTimeout(function() {
		var sectionHeight = $('#content section').height();

		for ( i = 0; i <= sectionCount; i++) {
			var sectionTitle = $('section').eq(i).data('title');
			var sectionPosition = (sectionHeight * i) + 'px';
			$('nav ul li').eq(i).html(sectionTitle);
			$('#bullets ul li .bulletNote').eq(i).html(sectionTitle);
			
		}

		setTochScroll();
		

	}, 100);
}

function buttonActions() {
	$('nav ul li').click(function() {
		var liClicked = $(this).index();
		goToSection(liClicked);
	});

	$('#bullets ul li').click(function() {
		var liClicked = $(this).index();
		goToSection(liClicked);
	});

	$('#menuIcon').click(function() {
		mobileMenu();
	});
	
	// $('#menuIcon').mouseenter(function() {
		// mobileMenu();
	// });
// 	
	// $('#menuIcon').mouseleave(function() {
		// mobileMenu();
	// });

	window.addEventListener("resize", function() {
		scurrilus_onepagescroll();
	}, true);

	window.addEventListener("orientationchange", function() {
		scurrilus_onepagescroll();
	}, true);
}

function scroll(scroll) {
	var currentScroll = $(document).scrollTop();
	var currentSection = $('section.active').index();

	for ( i = 0; i <= count; i++) {
		var currentSectionOffset = $('section.active').offset();
		var newcurrentNextSectionOffset = currentSectionOffset.top + duration;
		var newcurrentPrevSectionOffset = currentSectionOffset.top - duration;
		var nextSection = i + 2;
		var prevSection = i;

		if ((i == currentSection) && (currentScroll > newcurrentNextSectionOffset) && (scroll == 'down') && (!$('section').hasClass('locked'))) {

			removeActive();

			$("#content > section:nth-child(" + nextSection + ")").addClass('active');
			$("nav ul > li:nth-child(" + nextSection + ")").addClass('active');
			$("#bullets ul > li:nth-child(" + nextSection + ")").addClass('active');
			$('section.active').scrollTop(2);

			setTochScroll();

			var newScroll = (windowH - duration) + 'px';
			doScroll(newScroll, scroll);
		}

		if ((i == currentSection) && (currentScroll < newcurrentPrevSectionOffset) && (scroll == 'up') && (!$('section').hasClass('locked'))) {
			
			removeActive();

			$("#content > section:nth-child(" + prevSection + ")").addClass('active');
			$("nav ul > li:nth-child(" + prevSection + ")").addClass('active');
			$("#bullets ul > li:nth-child(" + prevSection + ")").addClass('active');
			$('section.active').scrollTop(2);

			setTochScroll();

			var newScroll = (windowH - duration) + 'px';
			doScroll(newScroll, scroll);
		}
	}
}

function doScroll(getScroll, scroll) {
	$('section.active').addClass('locked');
	$('#locked').addClass('blocked');
	$('#content').css('overflow', 'hidden');

	if (scroll == 'down') {
		$('#content').animate({
			scrollTop : '+=' + getScroll + ''
		}, {
			duration : scrollSpeed,
			easing : scrollEasingDown,
			complete : function() {
				resetPosition();
			}
		});
	}

	if (scroll == 'up') {
		$('#content').animate({
			scrollTop : '-=' + getScroll + '',
		}, {
			duration : scrollSpeed,
			easing : scrollEasingUp,
			complete : function() {
				resetPosition();
			}
		});
	}
}

function resetPosition() {
	var getPosition = $('section.active').index();
	var resetPosition = windowH * getPosition + 'px';

	$('#content').animate({
		scrollTop : resetPosition
	}, {
		duration : scrollSpeed,
		easing : scrollEasingDown,
		complete : function() {
			if ($('section.active').hasClass('touchScroll')) {
				setTimeout(function() {
					removeLocked();
				}, 1000);
			} else {
				removeLocked();
			}
		}
	});
}

function removeLocked() {
	$('#content').css('overflow', 'auto');
	$('section.active').removeClass('locked');
	$('#locked').removeClass('blocked');
}

function removeActive() {
	$('#content').css('overflow', 'hidden');
	$('section').removeClass('active');
	$('nav ul li').removeClass('active');
	$('#bullets ul li').removeClass('active');

	// $('section').animate({
		// scrollTop : '0'
	// }, {
		// duration : scrollSpeed,
		// easing : scrollEasingDown,
		// complete : function() {
// 
		// }
	// });
}

function goToSection(selected) {

	removeActive();

	$("#content section:nth-child(" + (selected + 1) + ")").addClass("active");

	$("nav ul li:nth-child(" + (selected + 1) + ")").addClass("active");
	$("#bullets ul li:nth-child(" + (selected + 1) + ")").addClass("active");

	var jump = windowH * selected + 'px';

	if (!$('section.active').hasClass('locked')) {
		$('section.active').addClass('locked');
		$('#locked').addClass('blocked');
		$('#content').animate({
			scrollTop : jump
		}, {
			duration : scrollSpeed,
			easing : scrollEasingDown,
			complete : function() {
				$('section.active').removeClass('locked');
				$('#locked').removeClass('blocked');
				$('#content').css('overflow', 'auto');
				setTochScroll();
			}
		});
	}
}

function setTochScroll() {
	var activeSectionHeight = $('section.active')[0].scrollHeight;

	// Get Scrollbar Width
	var wide_scroll_html = '<div id="wide_scroll_div_one" style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div id="wide_scroll_div_two" style="height:100px;width:100%"></div></div>';
	$("body").append(wide_scroll_html);
	var scroll_w1 = $("#wide_scroll_div_one").width();
	var scroll_w2 = $("#wide_scroll_div_two").innerWidth();
	var scroll_bar_width = scroll_w1 - scroll_w2;
	ContentWidth_A = (windowW + scroll_bar_width) + 'px';
	ContentWidth_B = windowW + 'px';
	$('#wide_scroll_div_one').remove();
	
	$('#content').css('width', ContentWidth_A);
	$('section').removeClass('locked');
	
	if (activeSectionHeight > windowH) {
		$('section.active').addClass('touchScroll');
		$('section.active').css('overflow', 'auto');

	} else {
		$('section.active').removeClass('touchScroll');
		$('section.active').css('overflow', 'hidden');
	}
}

function mobileMenu(state) {
	var menuHeight = $('nav').height() + 'px';
	var menuDuration = 300;
	if (!$('#menuIcon').hasClass('open')) {
		$('nav').css('display', 'block');
		$('#menuIcon').css('top', '0');

		$('nav').animate({
			top : '0'
		}, {
			easing : 'easeOutQuart',
			duration : menuDuration
		});

		$('#menuIcon').animate({
			top : menuHeight
		}, {
			easing : 'easeOutQuart',
			duration : menuDuration,
			complete : function() {
				$('#menuIcon').addClass('open');
			}
		});

	} else {
		$('#menuIcon').animate({
			top : '0'
		}, {
			easing : 'easeOutQuart',
			duration : menuDuration
		});

		$('nav').animate({
			top : '-' + menuHeight
		}, {
			easing : 'easeOutQuart',
			duration : menuDuration,
			complete : function() {
				$('#menuIcon').removeClass('open');
				$('#nav').addClass('open');
			}
		});
	}
}
