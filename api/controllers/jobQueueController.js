'use strict';

var mongoose = require('mongoose'),
	Job = mongoose.model('Jobs'),
	cheerio = require('cheerio'), //Web scrapper
	request = require('request');

exports.list_all_jobs = function(req, res) {
	Job.find({}, function(err, job) {
		if (err) {
			res.send(err);
		}
		res.json(job);
	});
};

function get_source_code(url, callback) { //function to get source code from given website
	request(url, function(error, response, html){
		if (!error) {
			var $ = cheerio.load(html);
			return callback(String($.html()));
		} else {
			return callback(0); //Website not valid, returning an error
		}
	});
}


exports.create_a_job = function(req, res) {
	var new_job = new Job(req.body);
	var url = new_job.toObject().url; //Converts Mongo schema into json object to access fields
	get_source_code(url, function(response) {
		if (response) { //Source code scrapped case
			new_job.source_code = response;
			new_job.status = ["COMPLETED"];
			new_job.save(function(err, job) {
				if (err) {
					res.send(err);
				}
				res.json("Job ID: " + new_job._id);
			});
		} else { //Source code scraped failed or incorrect input
			new_job.status = ["FAILED"];
			new_job.source_code = "Website could not be parsed";
			new_job.save(function(err, job) {
				if (err) {
					res.send(err);
				}
				res.json("Job ID: " + new_job._id);
			});
		}
	});
};

exports.read_a_job = function(req, res) {
  Job.findById(req.params.jobId, function(err, job) {
    if (err)
      res.send(err);
    res.json(job);
  });
};

exports.update_a_job = function(req, res) {
  Job.findOneAndUpdate(req.params.jobId, req.body, {new: true}, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(job);
  });
};

exports.delete_a_job = function(req, res) {
	Job.remove({
		_id: req.params.jobId
	}, function(err, job) {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Job successfully deleted'});
	});
};


