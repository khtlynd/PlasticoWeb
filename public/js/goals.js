var refGoals = firebase.database().ref("goals");
refGoals.on('child_added', function(snapshot) {
    //Read data goals
    dataGoals = `<tr class="table-row">
    <td>` + snapshot.child("goals_name").val() + ` </td>
    <td>` + snapshot.child("exp_period").val() + ` days</td>
    <td>` + snapshot.child("target").val() + ` times</td>
    <td>` + snapshot.child("extra_point").val() + ` pts</td>
    <td><button class="btn btn-danger" onclick="btnDelete('` + snapshot.key + `')">Delete</button></td>
</tr>`

    //Function to show data in table
    $("#dataGoals").append(dataGoals).hide().show('fast');
})

//to delete content
function btnDelete(uid) {
    var result = confirm("Are you sure to delete?");
    if (result) {
        refGoals.child(uid).set({
            "goals_id": null
        }, function(error) {
            if (error) {
                // The write failed...
                Notify.alert("Unable to delete data.")
                $(".loading").hide();
            } else {
                // Data saved successfully!
                $(".loading").hide();
                window.location.reload(true);
            }
        });
    }
}