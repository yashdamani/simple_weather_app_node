var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var apikey = '20ee404b70996cf68ee49677d9efa043';
var port  = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index', {weather:null, error:null});
});

app.post('/', function(req, res){
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

	request(url, function(err, response, body){
		if(err) {
			res.render('index', {weather : null, error: 'Error, try again.'});
		}
		else {
			let weather = JSON.parse(body);
			if(weather.main == undefined) {
				res.render('index', {weather : null, error: 'Error, try again.'});
			}
			else{
				let responseText = `Temperature in ${weather.name} is ${weather.main.temp}`;
				res.render('index', {weather : responseText, error : null})
			}
		}
	});
});

app.listen(port, function(req, res){
	console.log(`Server ${port}`)
});
