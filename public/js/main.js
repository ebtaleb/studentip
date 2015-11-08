function parseJsonDate(jsonDate) {
    var myNewJSDateObj = new Date(jsonDate);
    return myNewJSDateObj.toLocaleString();
};

var createBubble = function(item) {
    console.log(item._id);
    newdiv = document.createElement("div");
    newdiv.className = "tip";

    // Create tip
    newdiv.innerHTML = 
        // "<a href='/" + item._id + "'>" +
        "<div class='tip-container'>" +
            "<div class='tip-img'><i class='fa fa-user'></i></div>" +
            "<div class='tip-content'>" +
                "<div class='tip-head'>" +
                    "<div class='tip-author'>" + item.owner + "</div>" +
                    "<div class='tip-date'>" + parseJsonDate(item.creation_date) + "</div>" +
                "</div>" + 
                "<div class='tip-txt'>" +
                    item.content +
                "</div>" +
                "<div class='tip-actions'>" +
                    "<i class='fa fa-comment' onclick=\"$('#tip-comments" + item._id +"').toggle()\"></i> " + item.comments.length +
                "</div>" +
            "</div>" +  
        "</div>";
        // "</a>";

    // Prepare comments
    var comments = "";

    for(var i in item.comments) {
       comments += 
            "<div class='tip-comment'>" +
                "<div class='tip-com-img'><i class='fa fa-user'></i></div>" +
                "<div class='tip-com-content'>" +
                    "<div class='tip-com-head'>" +
                        "<div class='tip-com-author'>" + item.comments[i].owner + "</div>" +
                        "<div class='tip-com-date'>" + parseJsonDate(item.comments[i].creation_date) + "</div>" +
                    "</div>" + 
                    "<div class='tip-com-txt'>" +
                        item.comments[i].content +
                    "</div>" +
                "</div>" +  
            "</div>";
    }

    // Add comments under tip
    newdiv.innerHTML += 
        "<div id='tip-comments" + item._id + "' class='tip-comments' style='display:none'>" +
            comments + 
            "<div class='comment-add'>" +
                "<textarea id='comment-add-txt" + item._id + "' class='comment-add-txt'></textarea>" +
                "<i class='fa fa-paper-plane' onclick=\"sendComment($('#comment-add-txt" + item._id + "').val(), '" + item._id+"')\"></i>" +
            "</div>" + 
        "</div>";

    return newdiv;
};

$(document).ready(function () {
    $.getJSON("api/tips")
        .done(function (data) {
            $.each(data, function (key, item) {
                $(".container.new-tips").append(createBubble(item));
            });

            if($("#user-offline").val() == 1) {
                $(".comment-add").remove();
            }
        });
});

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
                $("#sentTip-input").val("");
            }
        });
    } else {
        // noty({layout: 'bottom', type: 'error', text: "Vous n'avez rien entré", timeout : 2000});
        alert_new_error("La zone de saisie est vide");
    }
}