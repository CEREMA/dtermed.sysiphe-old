
Materiels = {
	getAll: function(o,cb) {
		Materiels.using('db').model('sysiphe',sql("materiels"),cb);
	}
}

module.exports = Materiels;
