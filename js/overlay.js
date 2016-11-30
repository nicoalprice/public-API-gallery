/*** OVERLAY ***/

	var $overlay = $('<div id="overlay"></div>');
	var $wrapper = $('<div id="overlay-wrapper"></div>');
	var $image = $('<img id="overlay-image">');
	var $title = $('<p id="overlay-title"></p>');
	var $author = $('<p id="overlay-author"></p>');
	var $year = $('<p id="overlay-year"></p>');
	var $plot = $('<p id="overlay-plot"></p>');
	var $exit = $('<div id="exit"><img src="img/close-button.svg" alt="exit"></div>');
	var $prevArrow = $('<div id="prevArrow"><img src="img/left-arrow.svg" alt="previous" /></div>');
	var $nextArrow = $('<div id="nextArrow"><img src="img/right-arrow.svg" alt="next" /></div>');

	/* Function to open overlay */
	function openOverlay(type) {
		/* Add overlay to body of index.html */
		$("body").append($overlay);
		$overlay.append($wrapper);
		/* Stop click from opening img url */
		event.preventDefault();

		$wrapper.append($title);
		$wrapper.append($year);
		$wrapper.append($plot);

	// If book is clicked...
		if (type == book) {
			// Append author name
			$wrapper.append($author);
			$author.html('<p id="overlay-author">Author: ' + author + '</p>');
		} // end if statement for type = book

		// If movie is clicked...
		else if (type == movie) {
			/* Clear book data */
//			$overlay.hide($author);

		} // end if statement for type = movie

		// Append cover image
		$image.attr('src', cover);

		// Append title
		$title.html('<p id="overlay-title">Title: ' + title + '</p>');

		// Append year
		$year.html('<p id="overlay-year">Year: ' + year + '</p>');

		// Append plot
		$plot.html('<p id="overlay-plot">Plot: ' + plot + '</p>');

		/* add exit button. */
		$overlay.append($exit);

		 /* call function to capture info for the clicked image */
//		updateImage(cover, title);

		/* add image to overlay */
		$wrapper.append($image);

		/* add back and forward navigation buttons when lightbox is visible */
		$image.after($prevArrow);
		$image.before($nextArrow);

		/* show the overlay */
		$overlay.fadeIn(1500);
	}; // end openOverlay()

	/* When the next button is clicked... */
	$nextArrow.on("click", function(event) {
		nextImage();
	});

//	/* When right arrow key is pressed... */
//	$("body").keydown(function(event){
//		if ( event.which == 39 ) {
//			nextImage();
//	  }
//	});
//
//	/* When the previous button is clicked... */
//	$prevArrow.on("click", function(event){
//		previousImage();
//	});
//
//	/* When left arrow key is pressed... */
//	$("body").keydown(function(event){
//		if ( event.which == 37 ) {
//			previousImage();
//	  }
//	});

	/* Hide overlay when exit button is clicked. */
	$exit.on("click", function() {
		$overlay.fadeOut(1000).hide();
	});

	/* Hide overlay when esc key is pressed */
	$("body").keydown(function(event) {
		if (event.which == 27) {
			$overlay.fadeOut(1500).hide();
		}
	});

	/*** OVERLAY FUNCTIONS ***/
//
//	function updateImage(imageLocation, imageCaption) {
//		/* update image source */
//		$image.attr("src", imageLocation);
//		/* set caption text */
//		$caption.text(imageCaption);
//	}
//
	function nextImage() {
		 /* update index */
		index++;
		/* loop up to first image in gallery */
		if (index >= $("#gallery li").length) {
			index = 0;
		}

		title = movies[index].Title;

		};

//		/* use index to get next image */
//		var nextImage = $("#gallery li").get(index).getElementsByTagName("a");
//		/* get new image location and caption */
//		var imageLocation = $(nextImage).attr("href");
//		var imageCaption =  $(nextImage).children("img").attr("alt");
//		/* update the overlay image */
//		updateImage(imageLocation, imageCaption);
//	}
//
//	function previousImage() {
//		/* update the index */
//		index--;
//		/* loop back to last image in gallery */
//		if (index < 0) {
//			index = $("#gallery li").length - 1;
//		}
//		/* get the previous image by index */
//		var prevImage = $("#gallery li").get(index).getElementsByTagName("a");
//		/* update the image location and caption */
//		var imageLocation = $(prevImage).attr("href");
//		var imageCaption =  $(prevImage).children("img").attr("alt");
//		/* update the overlay */
//		updateImage(imageLocation, imageCaption);
//	}
	// end overlay code
