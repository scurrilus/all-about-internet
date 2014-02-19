count = null;
function init() {
	var sectionCount = $('#content section').length;
	count = sectionCount;
	console.log(count);
	var sectionHeight = $('#content section').height();
	var headerHeight = $('header').height();
	for ( i = 0; i <= sectionCount; i++) {
		var sectionPosition = (sectionHeight*i)+'px';
		$('section').eq(i).css('top', sectionPosition);
	}
}

function scroll() {
	var currentScroll = $(document).scrollTop();
	var currentSection = $('section.active').index();
	console.log(currentSection);
	
	
	for ( i = 0; i <= count; i++) {
		var currentSectionOffset = $('section.active').offset();
		var newcurrentSectionOffset= currentSectionOffset.top+200;
		if ((i == currentSection) && (currentScroll > newcurrentSectionOffset) ) {
			console.log('jetzt' + i);
			$('section').removeClass('active');
			$('section').next('section').addClass('active'); 
		} 
	}
	
	// if(currentScroll > )
}
