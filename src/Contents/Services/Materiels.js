
Materiels = {
	getArchive: function(o,cb) {
		var db=Materiels.using('db');
		var sql=db.sql('materiels',{idmateriel:o.idmateriel});
		db.model('sysiphe',sql,cb);
	},
	getMarques: function(o,cb) {
		var sql="SELECT * FROM marques WHERE ARCHIVE=0 AND IDMARQUE in (SELECT IDMARQUE FROM modeles WHERE IDFAMILLE="+o.idFamille+")";
		Materiels.using('db').model('sysiphe',sql,cb);
	},
	getAll: function(o,cb) {
		var db=Materiels.using('db');
		var objs=[
			'materiels.IDMATERIEL',
			'_BLOB',
			'affectations.IDAFFECTATION',
			'NOINVT',
			'SN NOSERIE',
			'NOTESMATERIEL',
			'DATELIVRAISON',
			'CARACT1',
			'CARACT2',
			'CARACT3',
			'CARACT4',
			'IDGARANTIE',
			'NOCOMMANDE',
			'NOFACTURE',
			'DATEFACTURE',
			'REFORME',
			'DATEREFORME',
			'SENSIBLE',
			'modeles.modele',
			'familles.FAMILLE',
			'familles.IDFAMILLE',
			'modeles.MODELE',
			'modeles.IDMODELE',
			'marques.MARQUE',
			'marques.IDMARQUE',
			'fournisseurs.FOURNISSEUR',
			'fournisseurs.IDFOURNISSEUR',
			'affectations.IDSYSIPHE',
			'affectations.IDUTILISATEUR',
			'affectations.DATEENTREE',
			'affectations.DATESORTIE',
			'IFNULL(COALESCE(concat(bpclight_agents.nom," ",bpclight_agents.prenom),utilisateurs.NOMUTILISATEUR),"A ATTRIBUER") Affectation',
			'IFNULL(COALESCE(bpclight_unites.libunic,unites.UNITE),"A ATTRIBUER") Unite',
			'IFNULL(bpclight_subdis.libsubc,"-") Service',
			'bpclight_etablissements.libets Etablissement'
		];	
		var where=[];
		console.log(o.quest);
		if (!o.quest) o.quest="[]";

        o=JSON.parse(o.quest);
		
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

		if (where.length==0) where.push("affectations.IDSTATUT=1 or affectations.IDSTATUT is null");
		
		var sql=db.get('materiels',objs,where);
		console.log(sql);
		
		db.model('sysiphe',sql,function(e,r) {
			console.log(r);
			cb(e,r);	
		});
	}
}

module.exports = Materiels;
