
const express = require('express');
const route = express.Router();
const passport = require('passport');

const serverHost = process.env.serverHost || "http://localhost:3000";

route.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);
route.get(
	'/google/redirect',
	passport.authenticate('google', {
		//failureRedirect: "http://localhost:3000"
		failureRedirect: serverHost
	}),
	function(req, resp) {
		//resp.redirect("http://localhost:3000/Profiles/"+ req.user.GoogleID);
		resp.redirect(serverHost+"/Profiles/"+ req.user.GoogleID);
	}
);

route.get('/verify', (req, res) => {
	if (req.user) {
		console.log(req.user);
	} else {
		console.log('not auth');
	}
});

route.get('/logout', (req, res) => {
	req.logout();
	res.redirect("http://localhost:3000");
});

module.exports = route;