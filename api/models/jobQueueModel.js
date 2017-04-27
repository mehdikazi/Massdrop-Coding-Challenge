'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	url: {
		type: String,
		Required: 'Enter the website url'
	},
	source_code: {
		type: String,
		default: 'Getting source code'
	},
	status: {
		type: [{
			type: String,
			enum: ['IN-PROGRESS', 'FAILED', 'COMPLETED']
		}],
		default: ['IN-PROGRESS']
	}
});

module.exports = mongoose.model('Jobs', JobSchema);