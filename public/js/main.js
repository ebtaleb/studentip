function parseJsonDate(jsonDate) {
    var myNewJSDateObj = new Date(jsonDate);
    return myNewJSDateObj.toLocaleString();
};

var createBubble = function(item) {

    newdiv = document.createElement("div");
    newdiv.className = "tip";

    newquote = document.createElement("blockquote");
    newquote.className = "example-right";

    newlink = document.createElement("a");
    newlink.setAttribute("href", "/"+item._id);
    newlink.innerHTML = item.content;
    newquote.appendChild(newlink);
    newdiv.appendChild(newquote);

    p_user = document.createElement("p");
    p_user.innerHTML = item.owner + " - " + parseJsonDate(item.creation_date);
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
