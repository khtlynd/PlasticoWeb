var refFeedback = firebase.database().ref("feedback");
refFeedback.on('child_added', function(snapshot) {
    star = snapshot.child("rating_bar").val();
    alert(star);
    if (star == 1) {
        $("#star1").show("fast");
        $("#star2").hide();
        $("#star3").hide();
        $("#star4").hide();
        $("#star5").hide();
    } else if (star == 2) {
        $("#star1").show("fast");
        $("#star2").show("fast");
        $("#star3").hide();
        $("#star4").hide();
        $("#star5").hide();
    } else if (star == 3) {
        $("#star1").show("fast");
        $("#star2").show("fast");
        $("#star3").show("fast");
        $("#star4").hide();
        $("#star5").hide();
    } else if (star == 4) {
        $("#star1").show("fast");
        $("#star2").show("fast");
        $("#star3").show("fast");
        $("#star4").show("fast");
        $("#star5").hide();
    } else if (star == 5) {
        $("#star1").show("fast");
        $("#star2").show("fast");
        $("#star3").show("fast");
        $("#star4").show("fast");
        $("#star5").show("fast");
    } else {
        $("#star1").hide();
        $("#star2").hide();
        $("#star3").hide();
        $("#star4").hide();
        $("#star5").hide();
    };

    //read data feedback
    feedback = `<tr class="table-row">
    <td>` + snapshot.child("username").val() + ` </td>
    <td><i class="fa fa-star checked" id="star1"></i>
    <i class="fa fa-star checked" id="star2"></i>
    <i class="fa fa-star checked" id="star3"></i>
    <i class="fa fa-star checked" id="star4"></i>
    <i class="fa fa-star checked" id="star5"></i></td>
    <td>` + snapshot.child("rating_scale").val() + ` </td>
    <td>` + snapshot.child("feedback").val() + ` </td>
</tr>`

    //Function to show data in table
    $("#feedback").append(feedback).hide().show('fast');
})