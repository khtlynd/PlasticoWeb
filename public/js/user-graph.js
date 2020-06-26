var binArray = [];
var fromuserjson = "";
var userdata = "";
var ulength = "";
var lineChart = "";

function changingChart(year) {
    binArray = [];

    for (var i = 1; i <= 12; i++) {
        var month = i;
        var binactivity = 0;
        for (var x = 0; x < ulength; x++) {
            dateD = fromuserjson[userdata[x]]["date"];
            monthD = dateD.split("-")[1];
            yearD = dateD.split("-")[0];
            if (monthD == month && yearD == year) {
                binactivity = binactivity + 1
            }
        }
        binArray.push(binactivity);
    }

    var ctx = document.getElementById("lineChart");
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Oct", "Nov", "Dec"],
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
                        labelString: 'Month'
                    }
                }]
            }
        }
    });
}

var userchart = firebase.database().ref("userBin");
//get user activity
userchart.once("value", function(snapshot) {
    var userjson = JSON.stringify(snapshot);
    fromuserjson = JSON.parse(userjson);
    userdata = Object.keys(fromuserjson);
    ulength = Object.keys(userdata).length;

    changingChart($("#selYear").val())
});

//deteksi perubahan dropdown year
$("#selYear").change(function() {
    changingChart($(this).val());
});