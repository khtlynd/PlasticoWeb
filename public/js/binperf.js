//firebase read
var refBin = firebase.database().ref("bin");
refBin.on('child_added', function(snapshot) {
    var binjson = JSON.stringify(snapshot);
    var frombinJson = JSON.parse(binjson);
    var bin_length = Object.keys(frombinJson).length;
    var binData = Object.keys(frombinJson);

    for (var x = 0; x < bin_length; x++) {
        if (frombinJson[binData[x]]["bin_status"] == 1) {
            $("#active").show("fast");
            $("#inactive").hide();
        } else if (frombinJson[binData[x]]["bin_status"] == 0) {
            $("#inactive").show("fast");
            $("#active").hide();
        } else {
            $("#active").hide();
            $("#inactive").hide();
        }
    }

    // bKey = snapshot.key;

    // stat = snapshot.child("bin_status").val() + bKey;
    // if (stat == 0) {
    //     $("#inactive").show("fast");
    //     $("#active").hide();
    // } else if (stat == 1) {
    //     $("#active").show("fast");
    //     $("#inactive").hide();
    // } else {
    //     $("#active").hide();
    //     $("#inactive").hide();
    // }

    dataBin = `<tr class="table-row">
    <td><a href="bin_profile?id=` + snapshot.key + `">Plastico Bin ` + snapshot.child("bin_name").val() + `</a></td>
    <td>` + snapshot.child("address").val() + `</td>
    <td><span id="active">Active</span><span id="inactive">Inactive</span></td>
</tr>`

    //showing bin option list
    $("#dataBin").append(dataBin).hide().show('fast');
});


$("#SelectBin").change(function() {
    var valopt = this.value;
    if (valopt != "none") {
        $("#tab_performance").fadeIn(250);
        //read firebase data
        var refBinData = firebase.database().ref("bin/" + valopt);
        refBinData.on('value', function(snapshot) {
            $("#address").html(snapshot.child("address").val());
            $("#last_accessed").html(snapshot.child("last_accessed").val());

            //membaca status
            stat = snapshot.child("bin_status").val();
            if (stat == 0) {
                $("#inactiveButton").click();
            } else if (stat == 1) {
                $("#activeButton").click();
            }
        });
    } else {
        $("#tab_performance").fadeOut(250);
    }
});

$("#activeButton").click(function() {
    //push firebase
    refBin.child($("#SelectBin").val()).update({
        "bin_status": 1
    }).then((snapshot) => {
        $("#inactiveButton").css("background-color", "#9b9191");
        $("#activeButton").css("background-color", "#84f14e");
    });
});

$("#inactiveButton").click(function() {
    //push firebase
    refBin.child($("#SelectBin").val()).update({
        "bin_status": 0
    }).then((snapshot) => {
        $("#activeButton").css("background-color", "#9b9191");
        $("#inactiveButton").css("background-color", "#f14e4e");
    });
});