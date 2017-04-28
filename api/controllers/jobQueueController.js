'use strict';

var mongoose = require('mongoose'),
	Job = mongoose.model('Jobs'),
	cheerio = require('cheerio'), //Web scrapper
	request = require('request'),
	kue = require('kue'),
	job_queue = kue.createQueue();

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

function newJob (new_job){
	var job = job_queue.create('new job', {
	   new_job: new_job
	 });
	console.log("Job ID: " + new_job._id);
	job.save();
}


exports.create_a_job = function(req, res) {
	var new_job = new Job(req.body);
	var url = new_job.toObject().url; //Converts Mongo schema into json object to access fields
	newJob(new_job);
	job_queue.process('new job', function (job, done) { //Function that gets ran when processing the queue (adding to database)
		get_source_code(url, function(response) {
			if (response) { //Source code scrapped case
				new_job.source_code = response;
				new_job.status = ["COMPLETED"];
				new_job.save(function(err, job) {
					if (err) {
						res.send(err);
					}
					console.log("Job ID: " + new_job._id + " COMPLETED");
					if (res) {
						res.json("Job ID: " + new_job._id);
					}
				});
			} else { //Source code scraped failed or incorrect input
				new_job.status = ["FAILED"];
				new_job.source_code = "Website could not be parsed";
				new_job.save(function(err, job) {
					if (err) {
						res.send(err);
					}
					console.log("Job ID: " + new_job._id + " FAILED");
					if (res) {
						res.json("Job ID: " + new_job._id);
					}
				});
			}
		});
		// done && done();
	})
};

exports.read_a_job = function(req, res) {
  Job.findById(req.params.jobId, function(err, job) {
    if (err)
      res.send("Job not COMPLETED. Try again later.");
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

exports.delete_all = function(req, res) {
	Job.remove( {}, function(err, job) {
		if (err) {
			res.send(err);
		}
		res.json({message: "All jobs deleted"});
	});
};


