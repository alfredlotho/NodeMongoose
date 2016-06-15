var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    
    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        "image": "images/uthapizza.png",
        "category": "mains",
        "label": "Hot",
        "price": "4.99",
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        Dishes.find({}, function (err, dishes) {
            if (err) throw err;
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
    
    // create a new promotion
    Promotions.create({
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    }, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);

        var id = promotion._id;

        Promotions.find({}, function (err, promotions) {
            if (err) throw err;
            db.collection('promotions').drop(function () {
                db.close();
            });
        });
    });
    
    
    // create a new leader
    Leaders.create({
       "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    }, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(leader);

        var id = leader._id;

        Leaders.find({}, function (err, leaders) {
            if (err) throw err;
            db.collection('leaders').drop(function () {
                db.close();
            });
        });
    });
});