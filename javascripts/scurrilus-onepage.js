count = null;
function init() {
	var sectionCount = $('#content section').length;
	count = sectionCount;
	console.log(count);
	var sectionHeight = $('#content section').height();
	var headerHeight = $('header').height();
	for ( i = 0; i <= sectionCount; i++) {
		var sectionPosition = (sectionHeight * i) + 'px';
		$('section').eq(i).css('top', sectionPosition);
	}
}

function scroll(scroll) {
	var currentScroll = $(document).scrollTop();
	var currentSection = $('section.active').index();
	var duration = 200;

	for ( i = 0; i <= count; i++) {
		var currentSectionOffset = $('section.active').offset();
		var newcurrentNextSectionOffset = currentSectionOffset.top + duration;
		var newcurrentPrevSectionOffset = currentSectionOffset.top - duration;
		console.log(newcurrentPrevSectionOffset);

		if ((i == currentSection) && (currentScroll > newcurrentNextSectionOffset) && (scroll == 'down') && (!$('section').hasClass('locked'))) {
			console.log('jetztNext' + i);
			var nextSection = i + 2;
			var selectedSection = i;
			$('section').removeClass('active');
			$("#content > section:nth-child(" + nextSection + ")").addClass('active');
			doScroll();
		}

		if ((i == currentSection) && (currentScroll < newcurrentPrevSectionOffset) && (scroll == 'up') && (!$('section').hasClass('locked'))) {
			console.log('jetztPrev' + i);
			var prevSection = i;
			$('section').removeClass('active');
			$("#content > section:nth-child(" + prevSection + ")").addClass('active');
			doScroll();
		}
	}
}

function doScroll() {
	console.log('scroll');
	$('section.active').addClass('locked');
	setTimeout(function() {
		$('html, body').animate({
			scrollTop : $("section.active").offset().top
		}, 200);
	}, 100);
	setTimeout(function() {
		$('section.active').removeClass('locked');
	}, 500);

}
