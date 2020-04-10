const db = require('../models/db.js');
const Listing = require('../models/ListingModel.js')
const Archer = require('../models/ArcherModel.js')

const profileController = {
	getProfile: function(req, res) {
		var query = {username: req.query.username}; //check where it comes from
		var projection = 'profilePic firstname lastname username rating idnum college description'

		db.findOne(Archer, query, projection, function(result){
			var details = {
				img: result.profilePic,
				firstname: result.firstname,
				lastname: result.lastname,
				username: result.username,
				rating: result.rating,
				idnum: result.idnum.toString().slice(0,3),
				college: result.college,
				description: result.description
			}
			console.log(details)

			query = {listingOwner: req.query.username};
			projection = 'images name description startPrice buyOutPrice' //limit images to 1

			db.findMany(Listing, query, projection, function(result){
				details.products = result;
				res.render('profile', details);
			});
		});

	},

	submitRating: function(req, res) {
		var query = {username: req.query.username};

		db.findOne(Archer, query, projection=null, function(result){
			var ratings = result.ratings;
			ratings.push(req.query.rating);
			var sum = 0;
			for( var i = 0; i < ratings.length; i++ ){
			    sum += parseInt( elmt[i], 10 ); //don't forget to add the base
			}

			var avg = sum/ratings.length;
			var arch = {
				ratings: ratings,
				rating: avg
			}
			console.log(ratings)
			console.log(avg)

			db.updateOne(Archer, query, arch);
			res.send(avg);
		})

		

		
	}
}

module.exports = profileController
