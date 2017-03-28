App = {
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));
		app.post('/',app.UPLOAD.any(),function(req,res,next) {
			App.upload.up(req,res);
		});
		app.get('/docs/*',function(req,res) {
			var ff=req.originalUrl.split('/docs/')[1];
			App.using('db').query('sysiphe','select * from docs where docId="'+ff+'"',function(err,response) {
				if (response.length>0) {
					if (response[0]._blob=="") {
						res.end('Aucun document lié.');
					} else {
                        App.file.reader(response[0],res);
					}
				} else App.upload.reader(ff,res);
            });
        });		
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
				objs.push("*");
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