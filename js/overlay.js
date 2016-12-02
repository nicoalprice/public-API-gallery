/*** OVERLAY ***/

	var $overlay = $('<div id="overlay"></div>');
	var $wrapper = $('<div id="overlay-wrapper"></div>');
	var $image = $('<img id="overlay-image">');
	var $text = $('<div id="overlay-t"></div');
	var $title = $('<p></p>');
	var $author = $('<p></p>');
	var $director = $('<p></p>');
	var $plot = $('<p></p>');
	var $publisher = $('<p></p>');
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
	$wrapper.append($image);
	$wrapper.append($text);
	$text.append($title);
	updateOverlay(searchType);

	/* add exit button. */
	$overlay.append($exit);

	/* add back and forward navigation buttons when lightbox is visible */
	$image.after($prevArrow);
	$image.before($nextArrow);

	/* show the overlay */
	$overlay.fadeIn(1500);
}; // end openOverlay()

// Update overlay on event
function updateOverlay(searchType) {
	// Append cover image
	$image.attr('src', cover);
	// Append title and year
	$title.html('<p id="overlay-title">' + title + ' (' + year + ')</p>');

	// If book is clicked...
	if (searchType == 'book') {
		// Clear movie data
		$director.detach();
		$plot.detach();
		// Append author name
		$text.append($author);
		$author.html('<p id="overlay-author">Author: ' + author + '</p>');

		// Append publisher and place
		$text.append($publisher);
		$publisher.html('<p id="overlay-publisher">Publisher: ' + publisher + publishPlace + '</p>');
	} // end if statement for type = book

	// If movie is clicked...
	if (searchType == 'movie') {
		/* Clear book data */
		$author.detach();
		$publisher.detach();
		//Append director
		$text.append($director);
		$director.html('<p id="overlay-director">Directed by: ' + director + '</p>');
		// Append plot
		$text.append($plot);
		$plot.html('<p id="overlay-plot">' + plot + '</p>');
	} // end if statement for type = movie
}; // end updateOverlay

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

/* When the previous button is clicked... */
$prevArrow.on("click", function(event){
	previousImage();
});

/* When left arrow key is pressed... */
$("body").keydown(function(event) {
	if ( event.which == 37 ) {
		previousImage();
	}
});

/* Hide overlay when exit button is clicked. */
$exit.on("click", function() {
	$overlay.fadeOut(1000);
});

/* Hide overlay when esc key is pressed */
$("body").keydown(function(event) {
	if (event.which == 27) {
		$overlay.fadeOut(1000);
	}
});

/***** OVERLAY FUNCTIONS *****/

function nextImage() {
	/* update index */
	index++;
	/* loop up to first image in gallery */
	if (index >= $("#gallery li").length) {
		index = 0;
	}

	if ($('input#book-search').is(":checked")) {
		setItemDetails(index, 'book');
	}
	// If movie search is checked
	else if ($('input#movie-search').is(':checked')) {
		setItemDetails(index, 'movie');
	}
};


function previousImage() {
	/* update the index */
	index--;
	/* loop back to last image in gallery */
	if (index < 0) {
		index = $("#gallery li").length - 1;
	}

	if ($('input#book-search').is(":checked")) {
		setItemDetails(index, 'book');

	}
	// If movie search is checked
	else if ($('input#movie-search').is(':checked')) {
		setItemDetails(index, 'movie');
	}

}; // end previousImage
