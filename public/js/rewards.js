var refReward = firebase.database().ref("reward");
refReward.on('child_added', function(snapshot) {
    //read data reward
    dataRewards = `<tr class="table-row">
    <td>` + snapshot.child("reward_name").val() + ` </td>
    <td>` + snapshot.child("content").val() + ` </td>
    <td>` + snapshot.child("redeem_point").val() + ` pts</td>
    <td><button class="btnDelete" onclick="btnDelete('` + snapshot.key + `')">Delete</button></td>
</tr>`

    //Function to show data in table
    $("#dataRewards").append(dataRewards).hide().show('fast');
})

//to delete content
function btnDelete(uid) {
    var result = confirm("Are you sure to delete?");
    if (result) {
        refGoals.child(uid).set({
            "reward_id": null
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