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
            refGoals.child(uid).set({
                "goals_id": null
            })
            $(".loading").hide();
            window.location.reload(true);
            Swal.fire(
                'Deleted!',
                'Goal has been deleted.',
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