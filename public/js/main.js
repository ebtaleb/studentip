
var createBubble = function(item) {

    test = [{'user' : 'derp', 'content' : 'people die when they are killed', 'date' : 'on 23 Oct', imgsrc : "http://lorempixel.com/50/50/people/6"}];

    newdiv = document.createElement("div");
    newdiv.className = "tip";

    newquote = document.createElement("blockquote");
    newquote.className = "example-right";
    newquote.innerHTML = item.content;
    newdiv.appendChild(newquote);

    p_user = document.createElement("p");
    p_user.innerHTML = item.owner + " - " + Date(item.creation_date).toLocaleString();
    newdiv.appendChild(p_user);

    return newdiv;
};

$(document).ready(function () {
    $.getJSON("api/tips")
        .done(function (data) {
            $.each(data, function (key, item) {
                $(".container.new-tips").append(createBubble(item));
            });
        });
});
