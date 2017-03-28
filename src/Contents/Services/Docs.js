Docs = {
	upload: function(list,ndx,cb) {
		if (!list[ndx]) {cb();return;}
		Docs.using('db').query('sysiphe','select docId from docs where docId="'+list[ndx].docId+'"',function(err,result) {
			if (result.length>0) {
				// déjà uploadé
				Docs.upload(list,ndx+1,cb);
			} else {
				Docs.using('db').query('sysiphe','insert into docs VALUES ("'+list[ndx].docId+'","-1","-1","-1","-1")',function() {
                    App.upload.toBase64(list[ndx].docId,function(err,blob) {
                        Docs.using('db').post('sysiphe','docs',{
                            docId: list[ndx].docId,
                            _blob: blob,
                            filename: list[ndx].filename,
                            type: list[ndx].filetype,
                            size: list[ndx].filesize
                        },function() {
                            Docs.upload(list,ndx+1,cb);
                        });                        
                    });
				});					
			}
		});
	}
}

module.exports = Docs;