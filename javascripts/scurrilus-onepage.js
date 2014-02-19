// Scroll Settings
//Jquery Easing Plugin Methodes - http://api.jqueryui.com/easings/
var scrollSpeed = 400;
var scrollEasingDown = 'easeOutBack';
var scrollEasingUp = 'easeOutBack';
var duration = 50;

/// END Settings

count = null;
windowH = null;

// Setup Navigation by Section Data-Title

setTimeout(function() {
	for ( i = 0; i <= count; i++) {
		$('nav ul').append('<li onclick="goToSection(' + i + ')">la</li>');
	}
}, 100);

function init() {
	var sectionCount = $('#content section').length;
	count = sectionCount;
	var headerHeight = $('header').height();
	var windowHeight = $(window).height();
	windowH = windowHeight;
	var setWindowHeight = windowHeight + 'px';
	$('#content section').css('height', setWindowHeight);
	$('#content').css('height', setWindowHeight);
	var navigation = $('<li />');
	setTimeout(function() {
		var sectionHeight = $('#content section').height();
		for ( i = 0; i <= sectionCount; i++) {
			var sectionTitle = $('section').eq(i).data('title');
			var sectionPosition = (sectionHeight * i) + 'px';
			$('nav ul li').eq(i).html(sectionTitle);
		}
	}, 100);
}

function scroll(scroll) {

	var currentScroll = $(document).scrollTop();
	var currentSection = $('section.active').index();

	for ( i = 0; i <= count; i++) {
		var currentSectionOffset = $('section.active').offset();
		var newcurrentNextSectionOffset = currentSectionOffset.top + duration;
		var newcurrentPrevSectionOffset = currentSectionOffset.top - duration;

		if ((i == currentSection) && (currentScroll > newcurrentNextSectionOffset) && (scroll == 'down') && (!$('section').hasClass('locked'))) {
			var nextSection = i + 2;
			var selectedSection = i;
			$('section').removeClass('active');
			$("#content > section:nth-child(" + nextSection + ")").addClass('active');

			var newScroll = (windowH - duration) + 'px';
			doScroll(newScroll, scroll);
		}

		if ((i == currentSection) && (currentScroll < newcurrentPrevSectionOffset) && (scroll == 'up') && (!$('section').hasClass('locked'))) {
			var prevSection = i;
			$('section').removeClass('active');
			$("#content > section:nth-child(" + prevSection + ")").addClass('active');

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
				restPosition();
			}
		});
	}

	if (scroll == 'up') {

		console.log('up' + getScroll);
		$('#content').animate({
			scrollTop : '-=' + getScroll + '',
		}, {
			duration : scrollSpeed,
			easing : scrollEasingUp,
			complete : function() {
				restPosition();
			}
		});
	}
}

function restPosition() {
	var getPosition = $('section.active').index();
	var resetPosition = windowH * getPosition + 'px';
	$('#content').animate({
		scrollTop : resetPosition
	}, {
		duration : scrollSpeed,
		easing : scrollEasingDown,
		complete : function() {
			$('section.active').removeClass('locked');
			$('#content').css('overflow', 'auto');
		}
	});
	setTimeout(function() {
		$('section.active').removeClass('locked');
		$('#content').css('overflow', 'auto');
	}, 500);
}

function goToSection(selected) {
	$('#content').css('overflow', 'hidden');
	var jump = windowH * selected + 'px';
	console.log("s: " + jump);
	if (!$('section').hasClass('locked')) {
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
