const Notify = require("notifyjs");

$("#Publish").click(function() {
    var refArticle = firebase.database().ref("article")
    refArticle.push({
        "title_article": $("#title").val(),
        "author": $("#author").val(),
        "date_article": $("#datepicker").val(),
        "content": $("#content").val(),
        "image_article": $("#image").val(),
        "total_like": 0,
        "total_dislike": 0
    }).then((snapshot) => {
        refArticle.child(snapshot.key).update({
            "article_id": snapshot.key
        })

        Notify.success('Article Successfully Added!');

        //reset form field
        $("#title").val("")
        $("#author").val("")
        $("#datepicker").val("")
        $("#content").val("")
        $("#image").val("")

    })
})