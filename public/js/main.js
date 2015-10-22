//window.onload = function() {
    //$.ajax({
        //type: "GET",
        //url: "api/tips",
        //dataType: "json",
        //success: function(data) {
            //$.each(data, function (key, item) {
                //newdiv = document.createElement("div");
                //newdiv.className = "tip";
                //newdiv.innerHTML = item.content + " by " + item.user;
                //$(".container.new-tips").append(newdiv);
            //});
        //}
    //});
//};
var createBubble = function(item) {

    newdiv = document.createElement("div");
    newdiv.className = "tip";

    newquote = document.createElement("blockquote");
    newquote.className = "example-right";
    newquote.innerHTML = item.content;
    newdiv.appendChild(newquote);

    p_user = document.createElement("p");
    p_user.innerHTML = item.user;
    newdiv.appendChild(p_user);

    return newdiv
};

$(document).ready(function () {
    $.getJSON("api/tips")
        .done(function (data) {
            $.each(data, function (key, item) {
                $(".container.new-tips").append(createBubble(item));
            });
        });
});
