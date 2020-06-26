function myMap() {
    var locations = [

    ];
    var refBin = firebase.database().ref("bin");
    // var bounds = new google.maps.LatLngBounds();

    refBin.once('value', function(snapshot) {
        var data = JSON.stringify(snapshot);
        var from_json = JSON.parse(data);
        data = Object.keys(from_json);

        for (var i = 0; i < data.length; i++) {
            locations.push(["123", from_json[data[i]]["latitude"], from_json[data[i]]["longitude"]]);
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new google.maps.LatLng(-6.8893488, 107.6160988),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    });
}