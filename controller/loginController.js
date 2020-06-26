const Login = require("../model/Login")

module.exports = {
    login: (req, res) => {
        res.render("login")
    },

    register: (req, res) => {
        res.render("register");
    },

    dashboard: (req, res) => {
        res.render("dashboard")
    },

    bin: (req, res) => {
        res.render("bin")
    },

    bin_profile: (req, res) => {
        res.render("bin_profile")
    },

    user: (req, res) => {
        res.render("user")
    },

    user_profile: (req, res) => {
        res.render("user_profile")
    },

    article: (req, res) => {
        res.render("article")
    },

    goals: (req, res) => {
        res.render("goals")
    },

    reward: (req, res) => {
        res.render("reward")
    },

    notification: (req, res) => {
        res.render("notification")
    },

    notifsetting: (req, res) => {
        res.render("notifsetting")
    },

    logout: function(req, res) {
        firebase.auth().signOut();
        res.cookie('userLogin', "", { maxAge: 0 });
        res.redirect("/")
    },

    save: (req, res) => {

    },

    update: (req, res) => {

    },

    destroy: (req, res) => {

    }
}