/*
 **********************
 ** Global variables **
 **********************
 */
var a_cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
var previous_card = "";
var previous_card_identifier = "";
var card_switch = true;
var nmbr_moves = 0;
var nmbr_stars = 1;
var mins = 0;
var secs = 0;
var timer;
var modal = "";
var win_counter = 0;

/*
 ********************
 ** Game Algorithm **
 ********************
 * start the game timer
 * shuffle the cards
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol
 *  - check a switch value, if it is true: set previous card value, if false: check current card with previous card
 *    + if the cards do match, lock the cards in the open position 
 *    + if the cards do not match, turn on the switch and hide the card's symbol 
 *    + increment the move counter and display it on the page 
 *    + if all cards have matched, display a message with the final score
 */
 
 // Start timer (counter)
start_timer();

//Shuffle and display cards
shuffle(a_cards).forEach(function(card){
	document.querySelector(".deck").insertAdjacentHTML('beforeend','<li class="card"><i class="fa '+card+'"></i></li>'); 
 });
 // Start listening to clicks on cards
document.querySelector(".deck").addEventListener('click',function(current_card){
	// Filter only clicks on cards
	if (current_card.target.className == "card") 
	{
		// Identify selected card
		var current_card_identifier = current_card.target.firstChild.className;
		show(current_card);
		// Increment number of moves
		set_moves(++nmbr_moves);
		set_level(nmbr_moves);
		// push the card into array of opened card
		if (card_switch) 
		{
			previous_card = current_card;
			previous_card_identifier = previous_card.target.firstChild.className;
			card_switch = false;
		}
		else
		{
			// Compare the new card with old card
			if (previous_card_identifier === current_card_identifier) // Cards match
			{
				match(current_card,previous_card);
				card_switch = true;
				if (++win_counter === 8) {
					open_modal();
				}
			}
			else // Cards do not match
			{
				setTimeout(function(){
					hide(current_card,previous_card);
				},500);
				card_switch = true;
			}
		}
	}
	else
	{
	}
});

/*
 ***************
 ** Functions **
 ***************
 */
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// A function to display the card's symbol
function show(elem) {
	elem.target.className = "card open show";
}

// A function to display two matching cards
function match(elem1,elem2) {
	elem1.target.className = "card match";
	elem2.target.className = "card match";
}

// A function to hide two mismatching cards
function hide(elem1,elem2) {
	elem1.target.className = "card";
	elem2.target.className = "card";
}

// A function to start game timer  
function start_timer() {
	timer = window.setInterval(function() {
	secs++;
	if (secs > 59) {
		mins++;
		secs = 0;
	}
	document.querySelector(".seconds").innerHTML = ("0" + secs).slice(-2);
	document.querySelector(".minutes").innerHTML = ("0" + mins).slice(-2);
	}, 1000);
}

// A function to reset the game
function reset_game(){
	// Remove cards
	document.querySelectorAll(".card").forEach(function(card){
	card.remove();
	});
	// Add new shuffled cards
	shuffle(a_cards).forEach(function(card){
	document.querySelector(".deck").insertAdjacentHTML('beforeend','<li class="card"><i class="fa '+card+'"></i></li>'); 
	}); 
	// Reset the stars
	document.querySelectorAll(".hide").forEach(function(star){
	star.classList.remove("hide");
	nmbr_stars = 1;
	});
	// Reset the timer
	secs = 0;
	mins = 0;
	// Reset the number of moves
	nmbr_moves = 0;
	set_moves(nmbr_moves);
	// Reset algorithm
	card_switch = true;
	// Reset win counter
	win_counter = 0;
}

// A function to set the number of moves
function set_moves(nmbr){
	document.querySelector(".moves").innerHTML = nmbr;
}

// A function to set the level
function set_level(nmbr){
	if (nmbr % 11 == 0)
	{
	var star = document.querySelectorAll(".fa.fa-star");
		if (star.length- nmbr_stars > 0) 
		{
			star[star.length- nmbr_stars].classList.add("hide");
			nmbr_stars++;
		}
		else
		{
		} 
	}
	else
	{
	}
}

// A function to open modal message
// Source: W3Schools
function open_modal(){
	// Get the modal
	modal = document.getElementById('myModal');
	// Stop timer
	clearInterval(timer);
	// Add modal message
	document.querySelector(".modal-content").insertAdjacentHTML('beforeend','<p class="message">It took you '+mins+' minutes and '+secs+' seconds to complete the game with a rating of '+(6-nmbr_stars)+'/5.</p>');
	document.querySelector(".modal-content").insertAdjacentHTML('beforeend','<div role="button" class="Btn" onclick="play_again()">Play Again</button>');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	// Show the modal
	modal.style.display = "block";
}

// Play again button function
function play_again(){
	// Hide the modal
	modal.style.display = "none";
	// Reset the game
	reset_game();
	// Restart timer
	start_timer();
	// Reset modal
	document.querySelector(".message").remove();
	document.querySelector(".Btn").remove();
}
