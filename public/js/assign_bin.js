$("#Submit").click(function() {

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

            //push to firebase
            var refBin = firebase.database().ref("bin")
            refBin.push({
                "bin_name": $("#binName").val(),
                "longitude": parseFloat($("#binLongitude").val()),
                "latitude": parseFloat($("#binLatitude").val()),
                "address": loc,
                "bin_status": 1,
                "trigger_status": 0,
                "bin_capacity": 0,
                "user_id": "",
                "name": "",
                "last_activity": ""
            }).then((snapshot) => {
                //generate uid per data push
                refBin.child(snapshot.key).update({ "bin_id": snapshot.key })

                //reset form field
                $("#binName").val("")
                $("#binLatitude").val("")
                $("#binLongitude").val("")

                Swal.fire(
                    'Done!',
                    'You have added new bin data',
                    'success'
                );
            });
        }
    }

    xhr.open('GET', "https://geocode.xyz/" + $("#binLatitude").val() + "," + $("#binLongitude").val() + "?geoit=xml", true);
    xhr.send('');

});