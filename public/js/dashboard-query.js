//NUMBER OF USERS
var totalDataUser = firebase.database().ref("user");
//get total user
totalDataUser.once("value", function(snapshot) {
    var json = JSON.stringify(snapshot);
    var fromJson = JSON.parse(json);
    var length = Object.keys(fromJson).length
    var data = Object.keys(fromJson)

    var totalActiveUser = 0;
    for (var i = 0; i < length; i++) {
        if (fromJson[data[i]]["user_status"] == 1) {
            totalActiveUser = totalActiveUser + 1
        }
    }

    $("#totalUser").text(totalActiveUser);
});


// NUMBER OF BINS
var totalDataBin = firebase.database().ref("bin");
//get total bin
totalDataBin.once("value", function(snapshot) {
    var binjson = JSON.stringify(snapshot);
    var frombinJson = JSON.parse(binjson);
    var bin_length = Object.keys(frombinJson).length;
    var binData = Object.keys(frombinJson);

    var totalActiveBin = 0;
    for (var x = 0; x < bin_length; x++) {
        if (frombinJson[binData[x]]["bin_status"] == 1) {
            totalActiveBin = totalActiveBin + 1
        }
    }
    //show result
    $("#totalBin").text(totalActiveBin);

    var almostFull = 0;
    for (var a = 0; a < bin_length; a++) {
        if (frombinJson[binData[a]]["bin_capacity"] >= 80) {
            almostFull = almostFull + 1
        }
    }
    //show result
    $("#almostFull").text(almostFull);
});

// var dateeee = Date.UTC();
// alert(dateeee);