
Materiels = {
	getAll: function(o,cb) {
		var db=Materiels.using('db');
		db.model('sysiphe',db.sql("materiels"),cb);
	}
}

module.exports = Materiels;
