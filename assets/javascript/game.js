var obi = 120;
var luke = 100;
var darth = 150;
var lea = 180;

function reset(){
    $("#restart").hide();
    $("#obiData").html(obi);
    $("#lukeData").html(luke);
    $("#darthData").html(darth);
    $("#leaData").html(lea);
}
$(document).ready(function() {
    reset();
    $(".character").click(function() { 
        $(this).appendTo($("#row2"));
        var picked = $(this)[0]
        $(".character").each(function() {
            if ($(this)[0] != picked) {
                $(this).appendTo($("#row3"));
            }
        });
    });
});