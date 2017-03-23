App = {
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));
		app.post('/materiels',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			if (req.body.quest) {
				var o=JSON.parse(req.body.quest);
				var db=App.using('db');
				var objs=[];
				var where=[];
				/*objs.push("batiments.LibBatC");
				objs.push("batiments.GPS");
				objs.push("agents.*");*/
				for (var i=0;i<o.length;i++)
				{
					var str="";
					if (i!=0) {
						str=' '+o[i].operator+' ';
					};
					str+=o[i].name;
					str+=o[i].value;
					where.push(str);
				};		
				var sql=db.get('sysiphe',objs,where);
				db.model('sysiphe', sql ,function(err,result) {
					res.end(JSON.stringify(result,null,4));
				});			
				return;
			};
		});
	}
};

module.exports = App;