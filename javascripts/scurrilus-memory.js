function scurrilus_memory() {
	loadImages();
}

function loadImages() {

	var imagePath = "http://www.scurrilus.de/scurrilus-jsfiddle/memory/memory-";
	var newMemImage;
	console.log(imagePath);

	$('#memory ul li').html('<div class="front"></div>');
	$('#memory ul li').sort(function() {
		return Math.random() * 10 > 5 ? 1 : -1;
	}).each(function() {
		var $m = $(this), memImage = $m.attr("class");
		newMemImage = memImage;
		$m.css('backgroundImage', 'url(' + imagePath + memImage + '.jpg' + ')').appendTo($m.parent());
	});

	selectImages();
}

function selectImages() {
	$('#memory ul li').click(function() {
		if (!$('#memory ul li').hasClass('select1') && (!$(this).hasClass('complete'))) {
			$(this).addClass('select1');
			$('.select1 .front').addClass('hide');
			
		}
		if ($('#memory ul li').hasClass('select1') && (!$('#memory ul li').hasClass('select2')) && (!$(this).hasClass('select1')) && (!$(this).hasClass('complete'))) {
			$(this).addClass('select2');
			$('.select2 .front').addClass('hide');
			checkImages();
		}
	});
}

function checkImages() {
	var newSelect1;
	var newSelect2;

	var select1 = $('.select1').attr("class").split(" ")[0];
	var select2 = $('.select2').attr("class").split(" ")[0];

	newSelect1 = select1;
	newSelect2 = select2;

	if (newSelect1 == newSelect2) {
		setTimeout(function() {
		$('.select1').html('');
		$('.select2').html('');
		$('#memory ul li').removeClass('select1');
		$('#memory ul li').removeClass('select2');
		$('.' + newSelect1).addClass('complete');
		}, 1000);
	} else {
		setTimeout(function() {
			$('.front').removeClass('hide');
			$('#memory ul li').removeClass('select1');
			$('#memory ul li').removeClass('select2');
}, 1000);
		
	}
	checkToFinish();

}

function checkToFinish() {
	var getCount = parseInt($('#momorycount').text());
	var newCount = (getCount + 1);
	$('#momorycount').text(newCount);
	var memoryLenght = $('#memory ul li').length;
	var tf = $('.complete').length;

	if (tf == memoryLenght) {
		$('#memory ul li').css('background', '#cc0000');
	}
}

