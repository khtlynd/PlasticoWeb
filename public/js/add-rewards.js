$("#rSubmit").click(function() {
    var refReward = firebase.database().ref("reward")
    refReward.push({
        "reward_name": $("#rname").val(),
        "content": $("#content").val(),
        "redeem_point": parseInt($("#rpoint").val()),
        "image_reward": $("#rimage").val()
    }).then((snapshot) => {
        refReward.child(snapshot.key).update({
            "reward_id": snapshot.key
        });
        Swal.fire(
            'Done!',
            'You have added new reward',
            'success'
        );

        $("#rname").val("")
        $("#content").val("")
        $("#rpoint").val("")
        $("#rimage").val("")
    })
})