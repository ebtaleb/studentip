var sendTip = function(username) {
    text = $("textarea#sendie").val();
    if (text) {
	    $.ajax({
		    type: "POST",
		    url: "api/tips/",
		    data: {'owner': username, 'content': text },
		    dataType: "json",
		    success: function(data){
                noty({layout: 'bottom', type: 'success', text: "tip sent", timeout : 2000});
                window.setTimeout( function() {window.location.href = data.url;}, 3000 ); 
		    }
	    });
    } else {
        noty({layout: 'bottom', type: 'error', text: "empty tip", timeout : 2000});
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
