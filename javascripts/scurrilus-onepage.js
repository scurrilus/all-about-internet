// Scroll Settings
//Jquery Easing Plugin Methodes - http://api.jqueryui.com/easings/
var scrollSpeed = 600;
var scrollEasingDown = 'easeOutBack';
var scrollEasingUp = 'easeOutBack';
var duration = 50;

// Global Settings
count = null;
windowH = null;

window.addEventListener("resize", function() {
	scurrilus_onepagescroll();
}, true);

// document.getElementById('body').ontouchmove = function(eve) {
// // scrollCheck();
// };
//
// document.getElementById('body').ontouchend = function(eve) {
// // setTimeout(scrollCheck, 50);
// };

setTimeout(function() {
	for ( i = 0; i <= count; i++) {
		$('nav ul').append('<li></li>');
		$('#bullets ul').append('<li></li>');
	}

	$('#content section:first').addClass('active');
	$('nav ul li:first').addClass('active');
	$('#bullets ul li:first').addClass('active');

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
		}
	}, 100);

	$('nav ul li').click(function(event) {
		var liClicked = $(this).index();
		goToSection(liClicked);
	});

	$('#bullets ul li').click(function(event) {
		var liClicked = $(this).index();
		goToSection(liClicked);
	});
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

			var newScroll = (windowH - duration) + 'px';
			doScroll(newScroll, scroll);
		}

		if ((i == currentSection) && (currentScroll < newcurrentPrevSectionOffset) && (scroll == 'up') && (!$('section').hasClass('locked'))) {

			removeActive();

			$("#content > section:nth-child(" + prevSection + ")").addClass('active');
			$("nav ul > li:nth-child(" + prevSection + ")").addClass('active');
			$("#bullets ul > li:nth-child(" + prevSection + ")").addClass('active');

			var newScroll = (windowH - duration) + 'px';
			doScroll(newScroll, scroll);
		}
	}
}

function doScroll(getScroll, scroll) {
	$('section.active').addClass('locked');
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
			removeLocked();
		}
	});
}

function removeLocked() {
	$('#content').css('overflow', 'auto');
	$('section.active').removeClass('locked');
}

function removeActive() {
	$('#content').css('overflow', 'hidden');
	$('section').removeClass('active');
	$('nav ul li').removeClass('active');
	$('#bullets ul li').removeClass('active');
	
	$('section').animate({
			scrollTop : '0'
		}, {
			duration : scrollSpeed,
			easing : scrollEasingDown,
			complete : function() {
				
			}
		});
}

function goToSection(selected) {
	removeActive();

	$("#content section:nth-child(" + (selected + 1) + ")").addClass("active");

	$("nav ul li:nth-child(" + (selected + 1) + ")").addClass("active");
	$("#bullets ul li:nth-child(" + (selected + 1) + ")").addClass("active");

	var jump = windowH * selected + 'px';

	if (!$('section.active').hasClass('locked')) {
		$('section.active').addClass('locked');
		$('#content').animate({
			scrollTop : jump
		}, {
			duration : scrollSpeed,
			easing : scrollEasingDown,
			complete : function() {
				$('section.active').removeClass('locked');
				$('#content').css('overflow', 'auto');
			}
		});
	}
}
