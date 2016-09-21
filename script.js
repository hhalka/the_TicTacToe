var XO = (function ($) {
    var Xs = [];
    var Os = [];
    var combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    var winner;
    var i = 1;
    var $table = $("#game");
    var $button = $("#newGame");
    var turn = $("#turn");
    var showWinner = $("#winner");
    var cells = $("td");
    
    function checkClass(element, className) {
        return element.hasClass(className);
    }

    function checkWinner(player) {
        console.log(player);
        var match = false;
        for(var i = 0; i < combinations.length; i++) {
            console.log(combinations[i]);
            if(combinations[i].every(function(j){return player.indexOf(j) !== -1})){
                match = true;
                i = 8;
                winner = player;
            }
        }

        if(winner==Os){
            $(showWinner).text("Congratulations, You won!");
        }else if(winner==Xs){
            $(showWinner).text("You're looser, I won!!!!!!!!!");
        }

    }

        function reload(){
            $table.find("td").each(function(number, element){
                if(element.classList.length !==0){
                    $(element).empty();
                    $(element).removeClass();
                }
                i = 1;
                winner = undefined;
                turn.text("You first");
                showWinner.text("");
            })
        }
        function bindEvents(){
            $table.on("click", function(e) {xo(e)});
            $button.on("click", function() {reload()});
        }

        function randomChoose(){
            turn.text("Your turn");
            var tds = $table.find("td");
            var cell = Math.round(Math.random() * (tds.length - 1));
            if(tds[cell].classList.length === 0){
                $(tds[cell]).append("<img src='img/x.png'/>");
                $(tds[cell]).addClass("cross");
                Xs.push(cell);
            }else{
                randomChoose();
            }
        }

        function xo(e) {
            turn.text("My turn");
            var target = e.target;
            if (winner === undefined && i <= 9) {
                if(target.classList.length ===0){
                    $(target).append("<img src='img/o.png'/>");
                    $(target).addClass("zero");
                    Os.push($("td").index($(target)));
                    i++;
                    checkWinner(Os);

                }
                if(!winner && i <= 9){
                    setTimeout(function(){
                        randomChoose();
                        i++;
                        checkWinner(Xs);
                    }, 2000);

                }
            }

        }

        return {
            bindEvents: bindEvents,
        }
    })(jQuery); 

    XO.bindEvents();
