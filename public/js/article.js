var refArticle = firebase.database().ref("article");
refArticle.on('child_added', function(snapshot) {

    //read data article

    dataArticle = `<tr class="table-row">
    <td>` + snapshot.child("title_article").val() + ` </td>
    <td>` + snapshot.child("author").val() + ` </td>
    <td>` + snapshot.child("date_article").val() + `</td>
    <td><button class="btn btn-danger" onclick="btnDelete('` + snapshot.key + `')">Delete</button></td>
</tr>`

    //Function to show data in table
    $("#dataArticle").append(dataArticle).hide().show('fast');
});


//to delete content
function btnDelete(uid) {
    // $(".loading").show();
    refArticle.child(uid).set({
        "article_id": null
    }, function(error) {
        if (error) {
            // The write failed...
            alert("Unable to delete data.")
            $(".loading").hide();
        } else {
            // Data saved successfully!
            $(".loading").hide();
            window.location.reload(true)
        }
    });
}