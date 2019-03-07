module.exports = function (app) {
    app.get("/", function (_req, res) {
        res.render("HomePage.ejs");
    });

    app.get("/Controll", function (_req, res) {
        res.render("Controll.ejs");
    });

    app.get("/History", function (_req, res) {
        res.render("History.ejs");
    });

}