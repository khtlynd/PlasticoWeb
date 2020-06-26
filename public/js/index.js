firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // No user is signed in.
        window.location.href = "dashboard"
    } else {
        $(".loading").hide()
    }
});

function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        Notify.alert("Error : " + errorMessage);

        // ...
    });

}

function register() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var tokenNum = document.getElementById("token_field").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (tokenNum == 2016) {
            window.location.href = "dashboard"
        } else {
            Notify.alert("Error : " + errorMessage);
        }
    });
}