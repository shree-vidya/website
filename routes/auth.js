var express 	= require ("express");
var router	    = express.Router();
var passport    = require("passport");
var User       = require("../models/user");


router.get("/login", function(req,res){
	res.render("login.ejs",{message:req.flash("error")});
});

router.post("/login", passport.authenticate("local",{
	/*successRedirect: "/secret",
	failureRedirect: "/login.ejs"*/

	successRedirect: "/",
	failureRedirect: "/login"
}), function(req,res){
});


router.get("/register", function(req,res){
	res.render("register.ejs");
});

router.post("/register", function(req,res){
	console.log(req.body.number);
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		
		
		if(err){
			req.flash("error", err.message)
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome "+ user.username);
			res.redirect("/");
		});
	});
});

router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged out");
	res.redirect("/");
});

module.exports = router;