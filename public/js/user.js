var refUser = firebase.database().ref("user");
refUser.on('child_added', function(snapshot) {

    //membaca data user
    dataUser = `<tr class="table-row">
        <td><a href="user_profile?id=` + snapshot.key + `">` + snapshot.child("full_name").val() + `</a></td>
        <td>@` + snapshot.child("username").val() + ` </td>
        <td>` + snapshot.child("email").val() + `</td>
        <td>` + snapshot.child("current_point").val() + ` pts </td>
    </tr>`

    $("#dataUser").append(dataUser).hide().show('fast');
});


//VIEW TOTAL USERS REGISTERED TO THE SYSTEM

// VIEW TOTAL ACTIVE USERS 
var totalDataUser = firebase.database().ref("user");
//get total user
totalDataUser.once("value", function(snapshot) {
    var json = JSON.stringify(snapshot);
    var fromJson = JSON.parse(json);
    var length = Object.keys(fromJson).length
    var data = Object.keys(fromJson)


    $("#allUser").text(length);
    //get only the active users
    var totalActiveUser = 0;
    var deactUser = 0;
    for (var i = 0; i < length; i++) {
        if (fromJson[data[i]]["user_status"] == 1) {
            totalActiveUser = totalActiveUser + 1
        } else {
            deactUser = deactUser + 1
        }
    }
    $("#totalUser").text(totalActiveUser);
    //get the deact users in total
    $("#deactUser").text(deactUser);


});