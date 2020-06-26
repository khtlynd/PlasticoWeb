var refNotif = firebase.database().ref("notification");
refNotif.on('value', function(snapshot) {
    $("#usernotiftime").html('Time Set in : ' + snapshot.child("user_notif").val() + ' days');
    $("#binnotiftime").html('Time Set in : ' + snapshot.child("bin_notif").val() + ' days');
});

$("#userNotif").click(function() {
    refNotif.update({
        "user_notif": parseInt($("#notif_user").val()),
    }).then((snapshot) => {
        Swal.fire(
            'Success!',
            'Data Succesfully Updated',
            'success'
        )
    });

});

$("#BinNotif").click(function() {
    refNotif.update({
        "bin_notif": parseInt($("#notif_bin").val()),
    }).then((snapshot) => {
        Swal.fire(
            'Success!',
            'Data Succesfully Updated',
            'success'
        )
    });


});

$("#resetNotif").click(function() {
    var resetRef = firebase.database().ref("user");
    resetRef.on('child_added', function(snapshot) {
        resetRef.child(snapshot.key).update({
            "status_notif": 0
        });
    });
});

//log notification
var refULog = firebase.database().ref("notif_log/user_log").orderByChild("timestamp");
refULog.on('child_added', function(snapshot) {
    notifUser = `<tr class="table-row">
    <td>` + snapshot.child("date").val() + ` </td>
    <td>` + snapshot.child("user_name").val() + ` </td>
    <td>User has reached inactivity threshold. An email notification sent to this user.</td>
</tr>`

    $("#notifUser").prepend(notifUser).hide().show('fast');
});

var refBLog = firebase.database().ref("notif_log/bin_log");
refBLog.on('child_added', function(snapshot) {
    notifBin = `<tr class="table-row">
    <td>` + snapshot.child("date").val() + ` </td>
    <td>` + snapshot.child("bin_name").val() + ` </td>
    <td>Bin has reached inactivity threshold. A notification sent to this admin.</td>
</tr>`
    $("#binNotif").prepend(notifBin).hide().show('fast');
})

var refCLog = firebase.database().ref("notif_log/capacity_log");
refCLog.on('child_added', function(snapshot) {
    capacityBin = `<tr class="table-row">
    <td>` + snapshot.child("date").val() + ` </td>
    <td>` + snapshot.child("bin_name").val() + ` </td>
    <td>` + snapshot.child("capacity").val() + `</td>
</tr>`
    $("#capacityNotif").prepend(capacityBin).hide().show('fast');
})