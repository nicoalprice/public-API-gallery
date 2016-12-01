/*** OVERLAY ***/

	var $overlay = $('<div id="overlay"></div>');
	var $wrapper = $('<div id="overlay-wrapper"></div>');
	var $image = $('<img id="overlay-image">');
	var $text = $('<div id="overlay-text"></div');
	var $title = $('<p id="overlay-title"></p>');
	var $author = $('<p id="overlay-author"></p>');
	var $director = $('<p id="overlay-director"></p>');
	var $plot = $('<p id="overlay-plot"></p>');
	var $exit = $('<div id="exit"><img src="img/close-button.svg" alt="exit"></div>');
	var $prevArrow = $('<div id="prevArrow"><img src="img/left-arrow.svg" alt="previous" /></div>');
	var $nextArrow = $('<div id="nextArrow"><img src="img/right-arrow.svg" alt="next" /></div>');

	/* Function to open overlay */
	function openOverlay(searchType) {
		/* Stop click from opening img url */
		event.preventDefault();

		/* Add overlay to body of index.html */
		$("body").append($overlay);
		$overlay.append($wrapper);
		$wrapper.append($text);

		// Append cover image
		$image.attr('src', cover);
		// Append title
		$text.append($title);
		$title.html('<p id="overlay-title">' + title + ' (' + year + ')</p>');

	// If book is clicked...
		if (searchType == 'book') {
			// Clear movie data
			$director.detach();
			$plot.detach();
			// Append author name
			$text.append($author);
			$author.html('<p id="overlay-author">Author: ' + author + '</p>');
		} // end if statement for type = book

		// If movie is clicked...
		if (searchType == 'movie') {
			/* Clear book data */
			$author.detach();
			//Append director
			$text.append($director);
			$director.html('<p id="overlay-director">Directed by: ' + director + '</p>');
			// Append plot
			$text.append($plot);
			$plot.html('<p id="overlay-plot">' + plot + '</p>');
		} // end if statement for type = movie

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

	/* When right arrow key is pressed... */
	$("body").keydown(function(event){
		if ( event.which == 39 ) {
			nextImage();
	  }
	});
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
		var nextImage = $('#gallery li').hasClass(index);
		var imageLocation = $(nextImage).attr('src');
		title = movies[index].Title;

		updateImage();

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
