console.log("home OK");

$(function(){
$( "a.addtip" ).click(function() {
    console.log("too OK");;
    $( "#newtip" ).toggle( "slow", function() {
        // Animation complete.
    });
});
});

