var refReward = firebase.database().ref("reward");
refReward.on('child_added', function(snapshot) {
    //read data reward
    dataRewards = `<tr class="table-row">
    <td>` + snapshot.child("reward_name").val() + ` </td>
    <td>` + snapshot.child("content").val() + ` </td>
    <td>` + snapshot.child("redeem_point").val() + ` pts</td>
    <td><button class="btn btn-danger" onclick="btnDelete('` + snapshot.key + `')">Delete</button></td>
</tr>`

    //Function to show data in table
    $("#dataRewards").append(dataRewards).hide().show('fast');
})

//to delete content
function btnDelete(uid) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            refReward.child(uid).set({
                "reward_id": null
            })
            $(".loading").hide();
            window.location.reload(true);
            Swal.fire(
                'Deleted!',
                'Reward has been deleted.',
                'success'
            );
        } else if (error) {
            // The write failed...
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
            $(".loading").hide();
        }
    })
}