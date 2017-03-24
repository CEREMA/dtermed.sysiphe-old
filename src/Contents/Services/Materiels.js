
Materiels = {
	getAll: function(o,cb) {
		var db=Materiels.using('db');
		console.log(db.sql("materiels"));
		db.model('sysiphe',db.sql("materiels"),function(e,r) {
			console.log(r);
			cb(e,r);	
		});
	}
}

module.exports = Materiels;
