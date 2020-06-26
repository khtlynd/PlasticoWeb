var refNotif = firebase.database().ref("notification");
refNotif.on('value', function(snapshot) {
    $("#usernotiftime").html('Time Set in : ' + snapshot.child("user_notif").val() + ' days');
    $("#binnotiftime").html('Time Set in : ' + snapshot.child("bin_notif").val() + ' days');
});

$("#userNotif").click(function() {
    refNotif.update({
        "user_notif": parseInt($("#notif_user").val()),
    });

    Notify.success('Successfully set!');

});

$("#binNotif").click(function() {
    refNotif.update({
        "bin_notif": parseInt($("#notif_bin").val()),
    });

    Notify.success('Successfully set!');

});

//log notification
var refULog = firebase.database().ref("notif_log/user_log");
refULog.on('child_added', function(snapshot) {
    notifUser = `<tr class="table-row">
    <td>` + snapshot.child("date").val() + ` </td>
    <td>` + snapshot.child("user_name").val() + ` </td>
    <td>User has reached inactivity threshold. An email notification sent to this user.</td>
</tr>`

    $("#notifUser").append(notifUser).hide().show('fast');
});

var BLog = firebase.database().ref("notfi_log/bin_log");
refBLog.on('child_added', function(snapshot) {
    notifBin = `<tr class="table-row">
    <td>` + snapshot.child("date").val() + ` </td>
    <td>` + snapshot.child("bin_name").val() + ` </td>
    <td>Bin has reached inactivity threshold. A notification sent to this admin.</td>
</tr>`
})