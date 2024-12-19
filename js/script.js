/*
File: script.js
GUI Assignment: Hw5, Creating a scrabble game.
David Lee, Umass Lowell, david_lee2@student.uml.edu
Date: 12/18/2024
Purpose: We were responsible for creating a scrabble game which entailed the following:
    - Be able to move letter tiles from a rack of randomized letters, to and back from the slots.
    - When the letters are put in: add those letters up, tally up a score for the localized instance & keep track
    of the highest score instance
    - Be able to reset the game
Similar to the previous project I was planning on having validation messages which would prompt the user to
follow the criteria (I wasn't able to finish this).
Unfortunately I wasn't able to finish the project in time so the project is missing a majority of its functionality.
Here are the things that I was able to work on:
    - startGame() does the following: it is supposed to parse the data from the json file created by former students
    who took the class, then using the math random function in javascript which I found through mdn docs, it will at
    random select letters to put onto the board. There are counts built into the for loop that will effectively
    subtract(via splice, removes it in place in the array:
    https://stackoverflow.com/questions/29605929/remove-first-item-of-the-array-like-popping-from-stack
    ) from the number of available letters in the pool altering the json data.
    - restartGame() does work and clears the rack when the button is clicked.
Apart from this most of the code is incomplete and very buggy. The letters will move sporadically when placed onto the board
and although if dragged off the board it will return to it. The tiles will not lock into place.

For resources: I referred to the api documentation for jQuery/ajax, mdn web docs for some nuanced functions and libraries
I was not used to (i.e. math), the lecture slides ...
*/

$(document).ready(function (){
    $("#myForm").validate({
        rules: {
            twoLetters: {
                required: true
            },
            noGaps: {
                required: true
            },
        },
        messages: {
            twoLetters: {
                required: "Please enter a word with => 2 characters"
            },
            noGaps: {
                required: "Please enter a word with no gaps"
            }
        },
        submitHandler: function() {
            foo();
        },

        //some sort of restart button has to exist
        //every time the restart button is hit,

        invalidHandler: function() {
            //tbd ...
        }
    });

    //some function that checks ...
    startGame();

});

function startGame() {
    // updating image location -> intial point should be rack -> final destination -> tile slots
    // function that adds up the total score, highest score -> put into temp value keep comparing submissions and only update when >

    var remTiles = 100;

    $.getJSON("pieces.json",function(data){ //pulls data from json file
        var json = data.pieces;
        var max = 26; //max number of letters we have
        console.log(tile);

        //putting in tile to rack

        for(var i = 0; i < 7; i++) {
            var count = Math.floor(Math.random() * max); //randomizer function that I read about on mdn docs
            var tile = json[count]; //
            json[count].amount--;
            if(json[count].amount == 0) { // when the tile is all used up pop from stack - subtract count
                json.splice(count, 1);
                max--; //popping from stack essentially.
            }
            var meowzers = '<img id="iFlag'+i.toString()+'"class="ui-draggable" src="../image/Scrabble-Tiles/Scrabble_Tile_' + tile.letter + '.jpg">';
            $('#rack').append(meowzers);

            var flag = '#iFlag' + i.toString();
            $(flag).draggable({
                revert:"invalid"
            });

            remTiles--;
        }
        // rack.innerHTML=output; //letter rack
    });

    $(".sSlot, .dSlot").droppable({
        drop: function(e, ui) {
            $(this).append(ui.draggable);
        }
        //snap: true
    });
}

function submitTiles() {
    for(var j = 0; j < 7; j++) {
        var count = Math.floor(Math.random() * max); //randomizer function that I read about on mdn docs
        var tile = json[count]; //
        json[count].amount--;
        if(json[count].amount == 0) { // when the tile is all used up pop from stack - subtract count
            json.splice(count, 1);
            max--; //popping from stack essentially.
        }
        var meowzers = '<img id="iFlag'+i.toString()+'"class="ui-draggable" src="../image/Scrabble-Tiles/Scrabble_Tile_' + tile.letter + '.jpg">';
        $('#rack').append(meowzers);

        var flagID = '#iFlag' + i.toString();
        $(flagID).draggable({
            revert:"invalid"
        });

        countTiles--;
    }
}
function restartGame() {
    $('#rack').html("");
    startGame();
}
