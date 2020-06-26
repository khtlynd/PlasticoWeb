firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $(".loading").hide()
    } else {
        window.location.href = "login"
    }
});

function logout() {
    firebase.auth().signOut();
}