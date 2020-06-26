$("#gSubmit").click(function() {
    var refGoals = firebase.database().ref("goals")
    refGoals.push({
        "goals_name": $("#gname").val(),
        "content": $("#content").val(),
        "exp_period": parseInt($("#exp-period").val()),
        "target": parseInt($("#target").val()),
        "extra_point": parseInt($("#xpoint").val())
    }).then((snapshot) => {
        //generate uid per data push
        refGoals.child(snapshot.key).update({
            "goals_id": snapshot.key
        });

        Notify.success('New Goals Successfully Added!');

        $("#gname").val("")
        $("#content").val("")
        $("#exp-period").val("")
        $("#target").val("")
        $("#xpoint").val("")
    })
})