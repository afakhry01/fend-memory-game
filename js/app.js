/*
 * Create a list that holds all of your cards
 */
var a_cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
var a_cards_opened = [];
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
document.querySelector(".deck").addEventListener('click',function(evt){
	// Filter only clicks on cards
	if (evt.target.className == "card") 
	{
		// Identify selected card
		var card_selected = evt.target.firstChild.className;
		show_card(evt);
		// push the card into array of opened card
		if (a_cards_opened.length === 0) 
		{
			a_cards_opened.push(card_selected);
		}
		else
		{
			// Compare the new card with old card
			if (a_cards_opened[0] === card_selected) // Cards match
			{
				match_card(evt);
				a_cards_opened = [];
			}
			//else // Cards do not match
			//{
				//console.log("Im here");
				//setTimeout(hide_card(evt),30000);
			//}
		}
	}
	else
	{
	}
});
 /*
  * A function to display the card's symbol
  */
  function show_card(elem) {
	  elem.target.className = "card open show";
	  //elem.classList.add("open");
  }
  
  function match_card(elem) {
	  elem.target.className = "card match";
  }
  
  function hide_card(elem) {
	  elem.target.className = "card";
  }
  
