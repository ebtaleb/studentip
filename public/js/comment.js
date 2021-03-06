function parseJsonDate(jsonDate) {
    var myNewJSDateObj = new Date(jsonDate);
    return myNewJSDateObj.toLocaleString();
};

var createComment = function(user, content, date, imgsrc) {
    new_comment = document.createElement("li");

    comment_picture = document.createElement("div");
    comment_picture.className = "commenterImage";

    comment_picture_img = document.createElement("img");
    comment_picture_img.setAttribute('src', imgsrc);
    comment_picture.appendChild(comment_picture_img);

    comment_text = document.createElement("div");
    comment_text.className = "commenterText";

    comment_content = document.createElement("p");
    comment_content.innerHTML = content;

    date_span = document.createElement("span");
    date_span.className = "date sub-text";
    date_span.innerHTML = user + " " + parseJsonDate(date);

    new_comment.appendChild(comment_picture);
    comment_text.appendChild(comment_content);
    comment_text.appendChild(date_span);
    new_comment.appendChild(comment_text);

    return new_comment;
}

var createCommentForm = function() {
    commentform = document.createElement("form");
    commentform.className = "form-inline";
    commentform.setAttribute('role',"form");

    // Text zone
    comment_input_grp = document.createElement("div");
    comment_input_grp.className = "form-group";

    comment_input = document.createElement("input");
    comment_input.className = "form-control";
    comment_input.setAttribute('type',"text");
    comment_input.setAttribute('placeholder',"Votre commentaire");
    
    // Add to the comment form
    comment_input_grp.appendChild(comment_input);
    commentform.appendChild(comment_input_grp);

    // Submit button
    comment_button_grp = document.createElement("div");
    comment_button_grp.className = "form-group";

    comment_button = document.createElement("button");
    comment_button.className = "btn btn-default add-cmt";
    comment_button.setAttribute('type',"button");
    comment_button.innerHTML = "Ajouter";

    // Add to the comment form
    comment_button_grp.appendChild(comment_button);
    commentform.appendChild(comment_button_grp);

    return commentform;
}

var addCommentBox = function(comments) {

    newdiv = document.createElement("div");
    newdiv.className = "detailBox";

    tipdiv = document.createElement("div");
    tipdiv.className = "tipBox";

    commentsdiv = document.createElement("div");
    commentsdiv.className = "commentList";

    for (i = 0; i < comments.length; i++) {
        newcomment = createComment(comments[i].owner, 
                                   comments[i].content,
                                   comments[i].creation_date,
                                   "http://lorempixel.com/50/50/people/9");
        commentsdiv.appendChild(newcomment);
        // create comments boxes from array and add them to the comment list div
    }

    commentform = createCommentForm();

    newdiv.appendChild(tipdiv);
    newdiv.appendChild(commentsdiv);
    newdiv.appendChild(commentform);

    return newdiv;
}

var addCommentToTip = function(id, username) {
    text = $("input.form-control").val();
    if (text) {
        var alert = alert_new_loading("Envoi...");
	    $.ajax({
		    type: "POST",
		    url: "api/tips/"+id+"/comments",
		    data: {'owner': username, 'content': text },
		    dataType: "json",
		    success: function(data){
                alert.remove();
                alert_new_success("Commentaire envoyé !");
                //noty({layout: 'bottom', type: 'success', text: "Commentaire ajouté", timeout : 2000});
			    $('input.form-control').val('');
                newcomment = createComment(username, 
                                           text,
                                           new Date().toJSON(),
                                           "http://lorempixel.com/50/50/people/9");
                $('.commentList').append(newcomment);
                alert.remove();
		    }
	    });
    } else {
        //noty({layout: 'bottom', type: 'error', text: "Erreur : commentaire vide", timeout : 2000});
        alert_new_error("Erreur : commentaire vide");
    }
}

