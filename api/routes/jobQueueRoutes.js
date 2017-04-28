'use strict';
module.exports = function(app) {
	var jobQueue = require('../controllers/jobQueueController');

	app.route('/jobs')
		.get(jobQueue.list_all_jobs)
		.post(jobQueue.create_a_job)
		.delete(jobQueue.delete_all);

	app.route('/jobs/:jobId')
		.get(jobQueue.read_a_job)
		.put(jobQueue.update_a_job)
		.delete(jobQueue.delete_a_job);
};