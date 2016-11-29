$(document).ready(function() {
	// Global Variables
	var book;
	var movie;
	var books = [];
	var movies = [];
	var title;
	var cover;
	var poster;
	var author;
	var index;

	// User enters a search term
	// When user hits enter key...
	$('body').keypress(function(event) {
		if (event.which == 13) { // enter
			event.preventDefault();

			// Callback function to display book search results
			function displayBooks(response) {
				var bookHTML = '<ul>'; // start gallery list
				books = response.docs;

				if (response.numFound == 0) {
						bookHTML += '<p id="no-results">No results found.</p>';
				}
				else {
				// Loop through search results
					for (i=0; i<100; i++) {
						// If edition_key exists
						if (books[i].edition_key) {
							bookHTML += '<li>';
							bookHTML += '<a href="http://openlibrary.org/books/';
							bookHTML += books[i].edition_key[0]+ '" target="_blank">';
							bookHTML += '<img src='
							if (books[i].cover_edition_key != undefined) {
								bookHTML +='"http://covers.openlibrary.org/b/olid/';
								bookHTML += books[i].cover_edition_key + '-M.jpg"';
							}
							else { // Display default cover image
								bookHTML += '"img/no-cover.png"';
							}
							bookHTML += ' alt="' + books[i].title + '"/></a>';
							bookHTML += '<p class="title">' + books[i].title + '</p>';
							bookHTML += '<p class="author">' + books[i].author_name + '</p>';
							bookHTML +='</li>';
						} // end edition_key if statement
					}; // end for loop
					} // end else statement

				bookHTML += '</ul>'; // end gallery list

				$('#gallery').html(bookHTML); //display books

				// If gallery li is clicked
				$('#gallery li a').click(function() {
					cover = $(this).children().attr('src');
					console.log('cover: ' + cover);
					title = $(this).children().attr('alt');
					openOverlay(book);
				});
			}; // end displayBooks


			// Callback function to display movie search results
			function displayMovies(response) {
				movies = response.Search;

				var movieHTML = '<ul>'; // start gallery list

				if (response.Response == false) {
						movieHTML += '<p id="no-results">No results found.</p>';
					}
				else {
					// Loop through search results
					for (i=0; i<movies.length; i++) {
						movieHTML += '<li>';
						movieHTML +='<img src="';
						// If no movie poster, display default image
						if (movies[i].Poster == "N/A") {
							movieHTML += 'img/no-cover.png" ';
						}
						else {
						movieHTML += movies[i].Poster + '" ';
						}
						movieHTML += 'alt="' + movies[i].Title + '"/></a>';
						movieHTML += '<p class="title">' + movies[i].Title + '</p>';
						movieHTML += '<p class="author">' + movies[i].Director + '</p>';
						movieHTML +='</li>';
					} // end for loop
				} // end if/else statement

				movieHTML += '</ul>'; // end gallery list

				$('#gallery').html(movieHTML); // display movies

				// If gallery li is clicked
				$('#gallery li').click(function(){
					poster = $(this).children().attr('src');
					title = $(this).children().attr('alt');
					author = $(this).children().attr('p.author');
					openOverlay(movie);
				});
			}; // end displayMovies

		// If book search is checked
		if ($('input#book-search').is(":checked")) {
			// Book search url
			var openLibraryAPI = 'https://openlibrary.org/search.json';
			var bookSearch = $('input#search').serialize();

			// AJAX request to OpenLibrary with search term
			$.getJSON(openLibraryAPI, bookSearch, displayBooks);
		}
		// If movie search is checked
		else if ($('input#movie-search').is(':checked')) {
			// Movie search url
			var movieAPI = 'https://www.omdbapi.com/?';
			// Get search terms
			var movieSearch = 's=' + $('input#search').val();
			// AJAX request to OMDB with search term
			$.getJSON(movieAPI, movieSearch, displayMovies);
		}

		}// end if statement for pressing Enter

	}); //end submit function


	/*** OVERLAY ***/

	var $overlay = $('<div id="overlay"></div>');
	var $image = $('<img id="overlay-image">');
	var $title = $('<p id="overlay-title"></p>');
	var $exit = $('<div id="exit"><img src="img/close-button.svg" alt="exit"></div>');
	var $prevArrow = $('<div id="prevArrow"><img src="img/left-arrow.svg" alt="previous" /></div>');
	var $nextArrow = $('<div id="nextArrow"><img src="img/right-arrow.svg" alt="next" /></div>');
	/* Keep track of image index for arrow buttons */
	var $index = 0;

	/* Function to open overlay */
	function openOverlay(type) {
		/* Add overlay to body of index.html */
		$("body").append($overlay);
		/* Stop click from opening img url */
		event.preventDefault();

		$overlay.append($image);
		$overlay.append($title);

		// If book is clicked...
		if (type === book) {
			/* append cover image */
			$image.attr('src', cover);

			/* append author name */

			/* append title */
			$title.append(title);

		} // end if statement for type = book

		// If movie is clicked...
		if (type === movie) {
			/* append cover image */
			$image.append().attr('src', poster);

			/* get plot */

		} // end if statement for type = movie

		/* add exit button. */
		$overlay.append($exit);

		 /* call function to capture info for the clicked image */
//		updateImage(cover, title);

		/* add image to overlay */
		$overlay.append($image);

		/* get index for current image */
		$index = $(this).parent().index();

		/* add text captions to the images when viewed in the lightbox. */
		$overlay.append(title);

		/* add back and forward navigation buttons when lightbox is visible */
		$image.after($prevArrow);
		$image.before($nextArrow);

		/* show the overlay */
		$overlay.fadeIn(1500);
	}; // end openOverlay()

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

	/* Hide overlay when exit button is clicked. */
	$exit.on("click", function() {
		$overlay.fadeOut(1000).hide();
	});

	/* Hide overlay when esc key is pressed */
	$("body").keydown(function(event) {
		if (event.which == 27) {
			$overlay.fadeOut(1000).hide();
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

}); //end ready
