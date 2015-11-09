function parseJsonDate(jsonDate) {
    var myNewJSDateObj = new Date(jsonDate);
    return myNewJSDateObj.toLocaleString();
};

var createBubble = function(item) {
    console.log(item._id);
    newdiv = document.createElement("div");
    newdiv.className = "tip";

    // Draw tip
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


    var comments = "";
    for(var i in item.comments) {
        comments += drawComment(item.comments[i].owner, item.comments[i].creation_date, item.comments[i].content);
    }

    // Draw form to add comment
    newdiv.innerHTML += 
        "<div id='tip-comments" + item._id + "' class='tip-comments' style='display:none'>" +
            comments +
            "<div id='comment-add" + item._id +"' class='comment-add'>" +
                "<textarea id='comment-add-txt" + item._id + "' class='comment-add-txt'></textarea>" +
                "<i class='fa fa-paper-plane' onclick=\"sendComment($('#comment-add-txt" + item._id + "').val(), '" + item._id+"')\"></i>" +
            "</div>" +
        "</div>";

    // Draw comments
    // for(var i in item.comments) {
    //     addCommentToTip(item._id, item.comments[i].owner, item.comments[i].creation_date, item.comments[i].content);
    // }

    return newdiv;
};


var drawComment = function(owner, date, content)
{
    var comment =
        "<div class='tip-comment'>" +
            "<div class='tip-com-img'><i class='fa fa-user'></i></div>" +
            "<div class='tip-com-content'>" +
                "<div class='tip-com-head'>" +
                    "<div class='tip-com-author'>" + owner + "</div>" +
                    "<div class='tip-com-date'>" + parseJsonDate(date) + "</div>" +
                "</div>" + 
                "<div class='tip-com-txt'>" +
                    content +
                "</div>" +
            "</div>" +
        "</div>"
    ;

    return comment;
}

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
    var text = $("#sentTip-input").val();
    if (text) {
        var alert = alert_new_loading("Envoi...");
        $.ajax({
            type: "POST",
            url: "api/tips/",
            data: {'owner': username, 'content': text },
            dataType: "json",
            success: function(data){
                // noty({layout: 'bottom', type: 'success', text: "Astuce crée", timeout : 2000});
                // window.setTimeout( function() {window.location.href = data.url;}, 3000 ); 
                alert.remove();
                alert_new_success("Envoyé !");
                $("#sentTip-input").val("");
                $("#sendTip-dialog").dialog("close");
                var comment = {"owner" : username, "creation_date": new Date(), "content": text, "comments": []};
                $(".new-tips").prepend(createBubble(comment));
            }
        });
    } else {
        // noty({layout: 'bottom', type: 'error', text: "Vous n'avez rien entré", timeout : 2000});
        alert_new_error("La zone de saisie est vide");
    }
}

function appendComment(comment) {
    comment_html =  "<div class='tip-comment'>" +
            "<div class='tip-com-img'><i class='fa fa-user'></i></div>" +
            "<div class='tip-com-content'>" +
                "<div class='tip-com-head'>" +
                    "<div class='tip-com-author'>" + comment.owner + "</div>" +
                    "<div class='tip-com-date'>" + parseJsonDate(comment.date) + "</div>" +
                "</div>" +
                "<div class='tip-com-txt'>" +
                    comment.content +
                "</div>" +
            "</div>" +
        "</div>";
    $(comment_html).insertBefore("#tip-comments"+comment.tip_id+" div.comment-add");
}

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
