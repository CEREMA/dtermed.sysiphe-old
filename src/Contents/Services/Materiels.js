
Materiels = {
	getAll: function(o,cb) {
		var db=Materiels.using('db');
		console.log(db.sql("materiels"));
		db.model('sysiphe',db.sql("materiels"),cb);
	}
}

module.exports = Materiels;
