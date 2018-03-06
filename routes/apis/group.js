"use strict";

var express = require("express"),
    router = express.Router(),
    fs = require('fs'),
    async = require('async'),
	_groups = require('../../data/groups.json'),
	_group_users = require('../../data/group_users.json'),
	_users = require('../../data/users.json'),
	_timezones = require('../../data/timezone.json');

router.post('/', function(req, res, next) {
	var data = req.body;
	var filteredGroups = _groups.filter(function(value) {
		return Number(data.school_id) == value.school_id
	})

	filteredGroups = filteredGroups.filter(item => {
		if (data.search != "")
			return item.name.toLowerCase().indexOf(data.search.toLowerCase()) > -1
		else
			return true
	})

	var from = (data.current_page - 1) * data.perpage
	var to = from + data.perpage

	var total_items = filteredGroups.length;
	filteredGroups = filteredGroups.slice(from, to)

	res.send({ total_items: total_items, groups: filteredGroups })
})

router.post("/create", function(req, res, next) {
	var group = req.body;
	var users = group.users;
	delete group.users;
	var created_id = _groups.length > 0 ? _groups[_groups.length - 1].id + 1 : 1;
	group.id = created_id;
	_groups.push(group);

	async.waterfall([
		function(callback) {
			fs.writeFile('data/groups.json', JSON.stringify(_groups), (err) => {
				if (err) { console.log(err); callback('error', 'error') }
				callback(null, 'ok');
			})
		},
		function(arg1, callback) {
			var created_id;
			users.forEach(function(user_id) {
				created_id = _group_users.length > 0 ? _group_users[_group_users.length - 1].id + 1 : 1;
				_group_users.push({id: created_id, group_id: group.id, user_id: user_id})
			})

			if (users.length > 0)
				fs.writeFile('data/group_users.json', JSON.stringify(_group_users), (err) => {
					if (err) { console.log(err); callback('error', 'error') }
					callback(null, 'ok')
				})
			else
				callback(null, 'ok')
		}
	], function(err, result) {
		res.send('ok');
	})
})

router.post("/update", function(req, res, next) {
	var group = req.body;
	var users = group.users;
	delete group.users;
	_groups = _groups.map(function(value) {
		return group.id == value.id ? group : value
	})

	async.waterfall([
		function(callback) {
			fs.writeFile('data/groups.json', JSON.stringify(_groups), (err) => {
				if (err) { console.log(err); callback('error', 'error') }
				callback(null, "ok");
			})
		},
		function(arg1, callback) {
			var group_users = _group_users.filter(function(group_user) {
				return group_user.group_id == group.id;
			})
			var orig_users = group_users.map(function(group_user) {
				return group_user.user_id;
			})
			var added = users.filter(function(group_user) {
				return orig_users.indexOf(group_user) == -1
			})
			_group_users = _group_users.filter(function(group_user) {
				return !(users.indexOf(group_user.user_id) == -1 && group_user.group_id == group.id)
			})

			var created_id;
			added.forEach(function(user_id) {
				created_id = _group_users.length > 0 ? _group_users[_group_users.length - 1].id + 1 : 1;
				_group_users.push({id: created_id, group_id: group.id, user_id: user_id})
			})

			if (added.length > 0)
				fs.writeFile('data/group_users.json', JSON.stringify(_group_users), (err) => {
					if (err) { console.log(err); callback('error', 'error') }
					callback(null, 'ok')
				})
			else
				callback(null, 'ok')
		}
	], function(err, result) {
		res.send('ok')
	})
})

router.get('/getTimezonesAndUsers', function(req, res, next) {
	res.send({timezones: _timezones, users: _users})
});

router.get("/:id", function(req, res, next) {
	var id = req.params.id;
	var group = {};
	_groups.forEach(function(value, index) {
		if (value.id == Number(id)) group = value
	});

	group.users = _group_users.filter(function(group_user) {
		return group_user.group_id == group.id
	}).map(function(group_user) {
		return group_user.user_id
	})

	res.send(group)
})

module.exports = router;