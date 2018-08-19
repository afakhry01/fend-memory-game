/*
 * Create a list that holds all of your cards
 */
var a_cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
var previous_card = "";
var previous_card_identifier = "";
var card_switch = true;
var nmbr_moves = 0;
var nmbr_stars = 1;
var mins = 0;
var secs = 0;

// Timer
window.setInterval(function() {
	secs++;
	if (secs > 59) {
		mins++;
		secs = 0;
	}
	document.querySelector(".seconds").innerHTML = ("0" + secs).slice(-2);
	document.querySelector(".minutes").innerHTML = ("0" + mins).slice(-2);
}, 1000);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 shuffle(a_cards).forEach(function(card){
	document.querySelector(".deck").insertAdjacentHTML('beforeend','<li class="card"><i class="fa '+card+'"></i></li>'); 
 });

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
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
  * A function to display the card's symbol
  */
  function show(elem) {
	  elem.target.className = "card open show";
  }
  
  function match(elem1,elem2) {
	  elem1.target.className = "card match";
	  elem2.target.className = "card match";
  }
  
  function hide(elem1,elem2) {
	  elem1.target.className = "card";
	  elem2.target.className = "card";
  }
  
  /*
   * A function to reset the game
   */
   
 function reset_game(){
	 console.log("Reset me please")
 }
 
	/*
	* A function to reset the game
	*/
 function set_moves(nmbr){
	 document.querySelector(".moves").innerHTML = nmbr;
 }
 
 function set_level(nmbr){
	 if (nmbr % 7 == 0)
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
