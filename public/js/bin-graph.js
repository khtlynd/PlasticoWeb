var fromuserjson = "";
var userdata = "";
var ulength = "";

var frombinjson = "";
var bindata = "";
var binUlength = "";

var lineChart = "";
var bar_chart = null;

// Return with commas in between
var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function changeChart(year) {
    if (bar_chart != null) {
        bar_chart.destroy();
    }
    var dataIsAppend = [];

    var dataPack = []
    var dates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];


    //get all bin id
    for (var x = 0; x < ulength; x++) {
        if (fromuserjson[userdata[x]]["year"] == year) {
            if (!dataIsAppend.includes(fromuserjson[userdata[x]]["bin_id"])) {
                dataIsAppend.push(fromuserjson[userdata[x]]["bin_id"]);
            }
        }
    }

    //input jumlah activity dalam setiap bin pada tiap bulan berbeda
    for (var i = 0; i < dataIsAppend.length; i++) {
        dataPackRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (var x = 0; x < ulength; x++) {
            if (fromuserjson[userdata[x]]["year"] == year) {
                if (dataIsAppend[i] == fromuserjson[userdata[x]]["bin_id"]) {
                    var index = dates.indexOf(fromuserjson[userdata[x]]["month"]);
                    dataPackRow[index] = dataPackRow[index] + 1
                }
            }
        }
        dataPack.push(dataPackRow)
    }

    //rename bin id to bin name
    for (var i = 0; i < dataIsAppend.length; i++) {
        for (var x = 0; x < binUlength; x++) {
            if (dataIsAppend[i] == frombinjson[bindata[x]]["bin_id"]) {
                dataIsAppend[i] = frombinjson[bindata[x]]["bin_name"]
                break;
            }
        }
    }

    var items = {
        type: 'bar',
        data: {
            labels: dates,
            datasets: []
        },
        options: {
            animation: {
                duration: 10,
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                    }
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: { display: false },
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        callback: function(value) { return numberWithCommas(value); },
                    },
                }],
            }, // scales
            legend: { display: true }
        } // options
    }

    for (var i = 0; i < dataIsAppend.length; i++) {
        var color = getRandomColor();
        items.data.datasets.push({
            label: dataIsAppend[i],
            data: dataPack[i],
            backgroundColor: color,
            hoverBackgroundColor: color,
            hoverBorderWidth: 0
        });
    }

    var bar_ctx = document.getElementById('barChart');
    bar_chart = new Chart(bar_ctx, items);
}

var userchart = firebase.database().ref("userBin");
//get user activity
userchart.once("value", function(snapshot) {
    var userjson = JSON.stringify(snapshot);
    fromuserjson = JSON.parse(userjson);
    userdata = Object.keys(fromuserjson);
    ulength = Object.keys(userdata).length;

    changeChart($("#selectYear").val())
});

var binRef = firebase.database().ref("bin");
//get bit data
binRef.once("value", function(snapshot) {
    var binjson = JSON.stringify(snapshot);
    frombinjson = JSON.parse(binjson);
    bindata = Object.keys(frombinjson);
    binUlength = Object.keys(bindata).length;
});

//deteksi perubahan dropdown year
$("#selectYear").change(function() {
    changeChart($(this).val());
});