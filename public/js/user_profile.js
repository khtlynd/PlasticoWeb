// const Notify = require("notifyjs");

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m, key, value) {
            vars[key] = value;
        });
    return vars;
}

var id = getUrlVars()["id"];
var refDataUser = firebase.database().ref("user/" + id);

refDataUser.once('value', function(snapshot) {
    $("#fname").html(snapshot.child("full_name").val());
    $("#uname").html("@" + snapshot.child("username").val());
    $("#email").html(snapshot.child("email").val());
    $("#point").html(snapshot.child("current_point").val() + " pts");
    $("#lastactivity").html(snapshot.child("last_activity").val());

    stat = snapshot.child("user_status").val();
    if (stat == 0) {
        $("#deactButton").fadeIn("fast");
        $("#deactButton").click();
    } else if (stat == 1) {
        $("#reactButton").fadeIn("fast");
        $("#reactButton").click();
    } else {
        $("#deactButton").hide();
        $("#reactButton").hide();
    }

});

$("#reactButton").click(function() {
    //push firebase
    refDataUser.update({
        "user_status": 1
    }).then((snapshot) => {
        $("#deactButton").show();
        $("#reactButton").hide();
    });
});

$("#deactButton").click(function() {
    //push firebase
    refDataUser.update({
        "user_status": 0
    }).then((snapshot) => {
        $("#reactButton").show();
        $("#deactButton").hide();
    });
});

var refUserGoal = firebase.database().ref("userGoal");
refUserGoal.on("child_added", function(snapshot) {
    gKey = snapshot.key;
    // alert(gKey);
    // var json = JSON.stringify(snapshot);
    // var fromJson = JSON.parse(json);
    // var length = Object.keys(fromJson).length
    // var data = Object.keys(fromJson)
    // alert(data);

    if (gKey == id) {
        var refGKey = firebase.database().ref("userGoal/" + gKey);
        var json = JSON.stringify(snapshot);
        var fromJson = JSON.parse(json);
        var length = Object.keys(fromJson).length
            // var data = Object.keys(fromJson)
            // alert(length);

        refGKey.on("child_added", function(snapshot) {
            var xtra = snapshot.child("extra_point").val();
            var trgt = snapshot.child("target").val();
            totalpts = xtra + trgt;

            // var counting = "";
            // var i;
            for (i = 1; i <= length; i++) {
                // counting += i + 1;
            }
            alert("hello" + i);

            gHistory = `<tr class="table-row">`
            `<td>Goals ` + `</td>
                <td>` + totalpts + ` pts</td>
            </tr>`
            $("#gHistory").append(gHistory).hide().show('fast');
        })
    };
});

var refUserReward = firebase.database().ref("userReward");
refUserReward.on("child_added", function(snapshot) {
    rKey = snapshot.key;

    if (rKey == id) {
        var refRKey = firebase.database().ref("userReward/" + rKey);
        refRKey.on("child_added", function(snapshot) {
            rHistory = `<tr class="table-row">
            <td>` + snapshot.child("reward_name").val() + ` </td>
            <td>` + snapshot.child("redeem_point").val() + ` pts</td>
        </tr>`

            $("#rHistory").append(rHistory).hide().show('fast');
        })
    }
});