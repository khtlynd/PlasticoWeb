var refFeedback = firebase.database().ref("feedback");
refFeedback.on('child_added', function(snapshot) {
    //read data feedback
    feedback = `<tr class="table-row">
    <td>` + snapshot.child("username").val() + ` </td>
    <td>` + snapshot.child("rating_bar").val() + ` </td>
    <td>` + snapshot.child("rating_scale").val() + ` </td>
    <td>` + snapshot.child("feedback").val() + ` </td>
</tr>`

    //Function to show data in table
    $("#feedback").append(feedback).hide().show('fast');
})