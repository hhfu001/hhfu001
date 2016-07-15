var mongoose = require('mongoose');
var HaixiuSchema = require('../schemas/haixiu');

var Haixiu = mongoose.model('Haixiu', HaixiuSchema);

module.exports = Haixiu;