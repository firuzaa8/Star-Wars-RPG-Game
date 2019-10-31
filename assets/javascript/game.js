var defender;
var myCharacter;

function trackScore() {
    $(".character").each(function(){
        $(this).find(".lifePoints").html($(this).data("points"))
    });   
}

function reset(){
    $("#restart").hide()
    $("#attack").hide();
    $(".character").each(function() {
        $(this).appendTo($("#row1"));
        $(this).show();
        $("#attackMessage").html("");
        $("#defendMessage").html("");
    });

    $("#obi").data("points", 120);
    $("#obi").data("damage", 5);
    $("#obi").data("name", "Obi");
   
    $("#luke").data("points", 100);
    $("#luke").data("damage", 8);
    $("#luke").data("name", "Luke");

    $("#darth").data("points", 150);
    $("#darth").data("damage", 9);
    $("#darth").data("name", "Darth");

    $("#lea").data("points", 180);
    $("#lea").data("damage", 7);
    $("#lea").data("name", "Lea");

    trackScore();

    $(".character").unbind();
    $(".character").click(function() { 
        $(this).appendTo($("#row2"));
        myCharacter = $(this);  
        $(".character").off("click");

        $(".character").each(function() {
            if (!myCharacter.is($(this))) {
                $(this).appendTo($("#row3"));
            }
        });
        $("#row3 > .character").click(function() {
            $(this).appendTo($("#row4"));
            $("#attack").show();
            defender = $(this);
            $("#row3 > .character").off("click");
        });
    });
}
$(document).ready(function() {
    reset();
    $("#restart").click(function() {
        reset();
    });
    // Game logic goes here
    $("#attack").click(function() {
        var myCharacterPoints = myCharacter.data("points");
        var defenderPoints = defender.data("points");

        myCharacterPoints = myCharacterPoints - defender.data("damage");
        defenderPoints = defenderPoints - myCharacter.data("damage");

        myCharacter.data("points", myCharacterPoints);
        defender.data("points", defenderPoints);

        trackScore();

        if (defenderPoints > 0 && myCharacterPoints > 0) {
            $("#attackMessage").html("You attacked " + defender.data("name") + " for " + myCharacter.data("damage") + " points.");
            $("#defendMessage").html(defender.data("name") + " attacked you back for " + defender.data("damage") + " points."); 
        }
        else if (myCharacterPoints <= 0) {
            $("#attackMessage").html("You have been defeated! Game OVER!!");
            $("#restart").show()
            $("#defendMessage").html("");
            $("#attack").hide();
        }
        else if (defenderPoints <= 0){
            $("#attackMessage").html("You WON!!!!");
            defender.hide();
            $("#defendMessage").html("You have defeated " + defender.data("name") + ", you can choose to fight another enemy");
            $("#attack").hide();
            $("#row3 > .character").click(function() {
                $(this).appendTo($("#row4"));
                defender = $(this);
                $("#row3 > .character").off("click");
                $("#attack").show();
            });

            if ($("#row3 > .character").length == 0) {
                $("#restart").show();
                $("#attackMessage").html("You defeated all of the enemies! This is your day!");
            }   
        }
        var randomIncrease = Math.floor(Math.random() * (8 - 3) ) + 3;
        var myCharacterDamage = myCharacter.data("damage") + randomIncrease;
        myCharacter.data("damage", myCharacterDamage);
        
    });
});
