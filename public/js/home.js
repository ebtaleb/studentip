var sendTip = function(username) {
    text = $("#sentTip-input").val();
    if (text) {
        var alert = alert_new_loading("Envoi...");
	    $.ajax({
		    type: "POST",
		    url: "api/tips/",
		    data: {'owner': username, 'content': text },
		    dataType: "json",
		    success: function(data){
                // noty({layout: 'bottom', type: 'success', text: "Astuce crée", timeout : 2000});
                window.setTimeout( function() {window.location.href = data.url;}, 3000 ); 
                alert.remove();
                alert_new_success("Envoyé !");
		    }
	    });
    } else {
        // noty({layout: 'bottom', type: 'error', text: "Vous n'avez rien entré", timeout : 2000});
        alert_new_error("La zone de saisie est vide");
    }
}

// document.ready
$(function(){
    $( "a.addtip" ).click(function() {
        console.log("too OK");;
        $( "#newtip" ).toggle( "slow", function() {
            // Animation complete.
        });
    });
});
