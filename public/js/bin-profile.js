function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m, key, value) {
            vars[key] = value;
        });
    return vars;
}

var id = getUrlVars()["id"];
var refBinData = firebase.database().ref("bin/" + id);

refBinData.on('value', function(snapshot) {
    $("#name").html(snapshot.child("bin_name").val());
    $("#address").html(snapshot.child("address").val());
    $("#binCapacity").html(snapshot.child("bin_capacity").val() + ' %');
    QRCode.toCanvas(document.getElementById('qrCode'), String(snapshot.key), function(error) {});

    //membaca status
    stat = snapshot.child("bin_status").val();
    if (stat == 0) {
        $("#inactiveButton").click();
    } else if (stat == 1) {
        $("#activeButton").click();
    }

    //bin capacity
    binCap = snapshot.child("bin_capacity").val();
    var percent = binCap + '%';
    $("#capacity").css("width", percent);
    if (binCap < 50) {
        $("#capacity").css("background-color", "#17a2b8");
        $("#percent").text(percent);
    } else if (binCap >= 50 && binCap < 80) {
        $("#capacity").css("background-color", "#f3c623");
        $("#percent").text(percent);
    } else if (binCap >= 80) {
        $("#capacity").css("background-color", "#f14e4e");
        $("#percent").text(percent);
    }
});

$("#activeButton").click(function() {
    //push firebase
    refBinData.update({
        "bin_status": 1
    }).then((snapshot) => {
        $("#inactiveButton").css("background-color", "#6c757d");
        $("#activeButton").css("background-color", "#28a745");
    });
});

$("#inactiveButton").click(function() {
    //push firebase
    refBinData.update({
        "bin_status": 0
    }).then((snapshot) => {
        $("#activeButton").css("background-color", "#6c757d");
        $("#inactiveButton").css("background-color", "#dc3545");
    });
});

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        x = xhr.responseXML.getElementsByTagName("staddress");
        staddress = ""
        for (i = 0; i < x.length; i++) {
            staddress += x[i].childNodes[0].nodeValue;
        }


        x = xhr.responseXML.getElementsByTagName("addr-street");
        addrstreet = ""
        for (i = 0; i < x.length; i++) {
            addrstreet += x[i].childNodes[0].nodeValue;
        }


        x = xhr.responseXML.getElementsByTagName("region");
        city = ""
        for (i = 0; i < x.length; i++) {
            city += x[i].childNodes[0].nodeValue;
        }
        loc = String(staddress) + ", " + String(addrstreet) + ", " + String(city);
    }
    QRCode.toCanvas(document.getElementById('qrCode'), String(snapshot.key), function(error) {

    })
}

xhr.open('GET', "https://geocode.xyz/" + $("#binLatitude").val() + "," + $("#binLongitude").val() + "?geoit=xml", true);
xhr.send('');




//bin chart

var fromuserjson = "";
var userdata = "";
var ulength = "";

var lineChart = null;

function changeChart(year, month) {
    if (lineChart != null) {
        lineChart.destroy();
    }
    binArray = [];
    for (var i = 1; i <= 31; i++) {
        var binactivity = 0;
        for (var x = 0; x < ulength; x++) {
            dateD = fromuserjson[userdata[x]]["date"];
            monthD = String(parseInt(dateD.split("-")[1]));
            yearD = dateD.split("-")[0];
            dayD = String(parseInt(dateD.split("-")[2]));
            if (String(i) == dayD && fromuserjson[userdata[x]]["bin_id"] == getUrlVars()["id"] && monthD == month && yearD == year) {
                binactivity = binactivity + 1
            }
        }
        binArray.push(binactivity);
    }
    if (month == "2") {
        if (year % 4 == 0) {
            var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        } else {
            var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        }
    } else if (month == "1" || month == "3" || month == "5" || month == "7" || month == "8" || month == "10" || month == "12") {
        var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    } else {
        var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    }

    var ctx = document.getElementById("lineChart");
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: numberOfDayList,
            datasets: [{
                data: binArray,
                label: "Sum of Activity",
                borderColor: "#3e95cd",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: "Bin Activity in " + year
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Sum of Activity'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    }
                }]
            }
        }
    });
}


//user chart
fromUser2json = "";
user2data = "";
user2Ulength = "";

var lineChart2 = null;

function changeChartUser(year, month, uid, uname) {
    if (lineChart2 != null) {
        lineChart2.destroy();
    }
    binArray = [];
    for (var i = 1; i <= 31; i++) {
        var binactivity = 0;
        for (var x = 0; x < ulength; x++) {
            if (fromuserjson[userdata[x]]["user_id"] == uid && String(i) == fromuserjson[userdata[x]]["date"] && fromuserjson[userdata[x]]["bin_id"] == getUrlVars()["id"] && fromuserjson[userdata[x]]["month"] == month && fromuserjson[userdata[x]]["year"] == year) {
                binactivity = binactivity + 1
            }
        }
        binArray.push(binactivity);
    }
    if (month == "2") {
        if (year % 4 == 0) {
            var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        } else {
            var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        }
    } else if (month == "1" || month == "3" || month == "5" || month == "7" || month == "8" || month == "10" || month == "12") {
        var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    } else {
        var numberOfDayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    }

    var ctx = document.getElementById("lineChart2");
    lineChart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: numberOfDayList,
            datasets: [{
                data: binArray,
                label: "Sum of Activity",
                borderColor: "#3e95cd",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: "Bin Activity in " + year + " ( User : " + uname + " )"
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Sum of Activity'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    }
                }]
            }
        }
    });
}

//get today
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0')); //January is 0!
var yyyy = today.getFullYear();
$("#selYear").val(yyyy).change()
$("#selMonth").val(mm).change()


var userchart = firebase.database().ref("userBin");
//get user activity
userchart.once("value", function(snapshot) {
    var userjson = JSON.stringify(snapshot);
    fromuserjson = JSON.parse(userjson);
    userdata = Object.keys(fromuserjson);
    ulength = Object.keys(userdata).length;

    changeChart(yyyy, mm)
    var userRef = firebase.database().ref("user");

    //get bit data
    userRef.once("value", function(snapshot) {
        var user2json = JSON.stringify(snapshot);
        fromUser2json = JSON.parse(user2json);
        user2data = Object.keys(fromUser2json);
        user2Ulength = Object.keys(user2data).length;

        listAppendData = []

        for (var i = 0; i < ulength; i++) {
            for (var x = 0; x < user2Ulength; x++) {
                if (fromuserjson[userdata[i]]["user_id"] == Object.keys(fromUser2json)[x]) {
                    if (!listAppendData.includes(fromuserjson[userdata[i]]["user_id"])) {
                        listAppendData.push(fromuserjson[userdata[i]]["user_id"])
                        $("#selUser").append(`<option value="` + fromuserjson[userdata[i]]["user_id"] + `">` + fromUser2json[user2data[x]]["full_name"] + `</option>`)
                        break;
                    }
                }
            }
        }

        $("#selYearUser").val(yyyy).change()
        $("#selMonthUser").val(mm).change()
    });
});

//deteksi perubahan dropdown year
$("#selYear").change(function() {
    changeChart($(this).val(), $("#selMonth").val());
});

//deteksi perubahan dropdown year
$("#selMonth").change(function() {
    changeChart($("#selYear").val(), $(this).val());
});

//deteksi perubahan dropdown year
$("#selYearUser").change(function() {
    changeChartUser($(this).val(), $("#selMonth").val(), $("#selUser").val(), $("#selUser :selected").text());
});

//deteksi perubahan dropdown year
$("#selMonthUser").change(function() {
    changeChartUser($("#selYear").val(), $(this).val(), $("#selUser").val(), $("#selUser :selected").text());
});

$("#selUser").change(function() {
    changeChartUser($("#selYear").val(), $("#selMonth").val(), $(this).val(), $("#selUser :selected").text());
});