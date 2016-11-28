$(document).ready(function() {
	// User enters a search term
	// When user hits enter key...
	$('body').keypress(function(event) {
		if (event.which == 13) { // enter
			event.preventDefault();

			// Book search url
			var openLibraryAPI = 'https://openlibrary.org/search.json';
			// Movie search url
			var movieAPI = 'https://www.omdbapi.com/?';
			// Get search terms
			var bookSearch = $('input#search').serialize();
			var movieSearch = 's=' + $('input#search').val();

			// Callback function to display book covers
			function displayBooks(response) {
				var bookHTML = '<ul>'; // start gallery list
				var books = response.docs;
				console.log(books);

				if (response.numFound == 0) {
						bookHTML += '<p id="no-results">No results found.</p>';
				}
				else {
				// Loop through search results
					for (i=0; i<100; i++) {
						// Only show titles with cover images
						if (books[i].cover_edition_key != undefined) {
							bookHTML += '<li>';
							bookHTML += '<a href="http://openlibrary.org/books/';
							bookHTML += books[i].edition_key[0] + '" target="_blank">';
							bookHTML +='<img src="http://covers.openlibrary.org/b/olid/';
							bookHTML += books[i].cover_edition_key;
							bookHTML += '-M.jpg" alt="' + books[i].title + '"/></a>';
							bookHTML += '<p class="title">' + books[i].title + '</p>';
							bookHTML += '<p class="author"' + books[i].author_name + '</p>';
							bookHTML +='</li>';
						}
					}; // end for loop
					} // end else statement

				bookHTML += '</ul>'; // end gallery list

				$('#gallery').html(bookHTML);
			}; // end displayBooks


			// Callback function to display movie posters
			function displayMovies(response) {
				var movies = response.Search;
				var movieHTML = '<ul>'; // start gallery list

				if (response.Response == false) {
						movieHTML += '<p id="no-results">No results found.</p>';
					}
				else {
					// Loop through search results
					for (i=0; i<movies.length; i++) {
						movieHTML += '<li>';
						movieHTML +='<img src="';
						movieHTML += movies[i].Poster + '" ';
						movieHTML += 'alt="' + movies[i].Title + '"/></a>';
						movieHTML += '<p class="title">' + movies[i].Title + '</p>';
						movieHTML +='</li>';
					} // end for loop
				} // end if/else statement

				movieHTML += '</ul>'; // end gallery list

				$('#gallery').html(movieHTML); // display movies
			}; // end displayMovies

		// If book search is checked
		if ($('input#book-search').is(":checked")) {
			// Make a GET request to OpenLibrary, sending the search term along
			$.getJSON(openLibraryAPI, bookSearch, displayBooks);
		}
		// If movie search is checked
		else if ($('input#movie-search').is(":checked")) {
			// AJAX request to OMDB
			$.getJSON(movieAPI, movieSearch, displayMovies);
		}

		}// end if statement for pressing Enter



	/*** OVERLAY ***/

	var $overlay = $("<div id='overlay'></div>");
	var $image = $("<img id='overlay-image'>");
	var $title = $("<p></p>");
//	var $exit = $('<div id="exit"><img src="images/icons/exit.png" alt="exit"></div>');
//	var $prevArrow = $('<div id="prevArrow"><img src="../img/eft-arrow.svg" alt="previous" /></div>');
//	var $nextArrow = $('<div id="nextArrow"><img src="../img/right-arrow.svg" alt="next" /></div>');
	/* Keep track of image index for arrow buttons */
	var $index = 0;

	/* When a thumbnail is clicked... */
	$("#gallery li").on("click", function(event) {

		/* Add overlay to body of index.html */
		$("body").append($overlay);

		alert("li was clicked!"); // test

		/* stop click from opening img url */
//		event.preventDefault();

//		/* get cover image */
//		var cover = $(this).attr("src");
//
//		/* get author from p.author */
//		var author = $(this).attr("p.author");
//
//		/* get title */
//		var title = $(this).attr("alt");
//
//		/* add exit button. */
//		$overlay.append($exit);
//
//		 /* call function to capture info for the clicked image */
//		updateImage(cover, title);
//
//		/* add image to overlay */
//		$overlay.append($image);
//
//		/* get index for current image */
//		$index = $(this).parent().index();
//
//		/* add text captions to the images when viewed in the lightbox. */
//		$overlay.append(title);
//
//		/* add back and forward navigation buttons when lightbox is visible */
//		$image.after($prevArrow);
//		$image.before($nextArrow);

		/* show the overlay */
//		$overlay.fadeIn(1500);
	});

//	/* When the next button is clicked... */
//	$nextArrow.on("click", function(event) {
//		nextImage();
//	});
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

//	/* Hide overlay when exit button is clicked. */
//	$exit.on("click", function() {
//		$overlay.fadeOut(1000).hide();
//	});
//
//	/* Hide overlay when esc key is pressed */
//	$("body").keydown(function(event) {
//		if (event.which == 27) {
//			$overlay.fadeOut(1000).hide();
//		}
//	});

	/*** OVERLAY FUNCTIONS ***/
//
//	function updateImage(imageLocation, imageCaption) {
//		/* update image source */
//		$image.attr("src", imageLocation);
//		/* set caption text */
//		$caption.text(imageCaption);
//	}
//
//	function nextImage() {
//		 /* update index */
//		$index++;
//		/* loop up to first image in gallery */
//		if ($index >= $("#gallery li").length) {
//			$index = 0;
//		}
//		/* use index to get next image */
//		var nextImage = $("#gallery li").get($index).getElementsByTagName("a");
//		/* get new image location and caption */
//		var imageLocation = $(nextImage).attr("href");
//		var imageCaption =  $(nextImage).children("img").attr("alt");
//		/* update the overlay image */
//		updateImage(imageLocation, imageCaption);
//	}
//
//	function previousImage() {
//		/* update the index */
//		$index--;
//		/* loop back to last image in gallery */
//		if ($index < 0) {
//			$index = $("#gallery li").length - 1;
//		}
//		/* get the previous image by index */
//		var prevImage = $("#gallery li").get($index).getElementsByTagName("a");
//		/* update the image location and caption */
//		var imageLocation = $(prevImage).attr("href");
//		var imageCaption =  $(prevImage).children("img").attr("alt");
//		/* update the overlay */
//		updateImage(imageLocation, imageCaption);
//	}
	// end overlay code

}); //end submit function

}); //end ready
