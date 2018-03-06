"use strict";

var express = require("express"),
	fs = require('fs'),
    router = express.Router(),
	_schools = require('../../data/schools.json'),
	_timezones = require('../../data/timezone.json');

router.post('/', function(req, res, next) {
	var data = req.body;
	var filteredSchools = _schools.filter(item => {
		if (data.search != "")
			return item.name.toLowerCase().indexOf(data.search.toLowerCase()) > -1
		else
			return true
	})

	var from = (data.current_page - 1) * data.perpage
	var to = from + data.perpage

	var total_items = filteredSchools.length;
	filteredSchools = filteredSchools.slice(from, to)

	res.send({ total_items: total_items, schools: filteredSchools })
})

router.post("/create", function(req, res, next) {
	var school = req.body;
	var created_id = _schools.length > 0 ? _schools[_schools.length - 1].id + 1 : 1;
	school.id = created_id;
	_schools.push(school);

	fs.writeFile('data/schools.json', JSON.stringify(_schools), (err) => {
		if (err) throw err;
		res.send(school);
	})
})

router.post("/update", function(req, res, next) {
	var school = req.body;
	_schools = _schools.map(function(value) {
		return school.id == value.id ? school : value
	})
	fs.writeFile('data/schools.json', JSON.stringify(_schools), (err) => {
		if (err) throw err;

		res.send("ok");
	})
})

router.get('/getTimezones', function(req, res, next) {
	res.send(_timezones)
});

router.get("/:id", function(req, res, next) {
	var id = req.params.id;
	var school = {};
	_schools.forEach(function(value, index) {
		if (value.id == Number(id)) school = value
	});

	res.send(school)
})

module.exports = router;