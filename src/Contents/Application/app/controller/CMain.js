App.controller.define('CMain', {

	views: [
		"VMain",
		"VAffectation",
		"VShowDoc"
	],
	
	models: [
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"mainform button#filter": {
				click: "filter_onclick"
			},
			"mainform grid": {
				itemdblclick: "grid_select"
			},
			"mainform button#new_materiel": {
				click: "new_materiel_click"	
			},
			"VAffectation": {
				show: "VAffectation_show"	
			},
			"VAffectation uploadfilemanager#up": {
				itemdblclick: "up_onclick"
			},
			"VAffectation combo#cboEts": {
				select: "ets_select"
			},
			"VAffectation combo#cboDpt": {
				select: "dpt_select"
			},
			"VAffectation combo#cboSrv": {
				select: "srv_select"
			},
			"VAffectation radiogroup#r0": {
				change: "radio_change"
			},
			"VAffectation combo#cboFamille": {
				select: "cboFamille_select"	
			},
			"VAffectation combo#cboMarque": {
				select: "cboMarque_select",
				keydown: "cboMarque_keys"
			},
			"VAffectation combo#cboUnite": {
				select: "cboUnite_select"
			},
			"VAffectation combo#cboServ": {
				select: "cboServ_select"
			},
			"VAffectation combo#cboModele": {
				keydown: "cboModele_keys"
			},
			"VAffectation combo#cboFournisseur": {
				keydown: "cboFournisseur_keys"
			},
			"VAffectation button#Exit": {
				click: "recordAffectation"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	recordAffectation: function(me) {
		//me.setDisabled(true);
		function _exit() {
			App.get('mainform grid').getStore().load();
			me.setDisabled(false);	
			me.up('window').close();	
		};
		// update materiels
		var cboMarque=App.get(me.up('window'),'combo#cboMarque');
		var cboModele=App.get(me.up('window'),'combo#cboModele');
		var cboFournisseur=App.get(me.up('window'),'combo#cboFournisseur');
		if (cboFournisseur.getRawValue()==cboFournisseur.getValue()) {
			// Nouvel enregistrement
			App.DB.post('sysiphe://fournisseurs',{FOURNISSEUR:cboFournisseur.getValue()},function(e,r) {
				console.log(e);
				if (e.insertId) cboFournisseur.setValue(e.insertId); else cboFournisseur.setValue('');
			});
		};
		//return;
		App.DB.post('sysiphe://materiels',me.up('window'),function(r) {
			var MID=r.insertId;
			App.Docs.upload(App.get('uploadfilemanager#up').getFiles(),0,function() {
				// Affectations
				var Post={};
				// On charge l'ancienne affectation
				App.DB.get('sysiphe://affectations?IDAFFECTATION='+App.get(me.up('window'),'textfield#IDAFFECTATION').getValue(),function(r) {
					if (r.data.length>0) {
						console.log(r.data);
						r.data=r.data[0];
						var Post=r.data;
						var isUpdate=false;
						if (r.data.IDUTILISATEUR!=App.get(me.up('window'),'combo#cboAgent')) isUpdate=true;
						if (r.data.IDSYSIPHE!=App.get(me.up('window'),'combo#cboAgentS')) isUpdate=true;
						if (isUpdate) {
							// On update l'ancien enregistrement en mettant IDSTATUT=0 et en complétant la date de sortie
							App.DB.post('sysiphe://affectations',{
								IDSTATUT: '0',
								IDAFFECTATION: App.get(me.up('window'),'textfield#IDAFFECTATION').getValue(),
								DATESORTIE: new Date()
							},function(r) {
								// Et on recrée l'enregistrement avec le nouvel utilisateur

								if (App.get(me.up('window'),'radiogroup#r0').items.items[1].getValue()) {
									delete Post.IDUTILISATEUR;
									Post.IDSYSIPHE=App.get(me.up('window'),'combo#cboAgentS').getValue();
								} else {
									delete Post.IDSYSIPHE;
									Post.IDUTILISATEUR=App.get(me.up('window'),'combo#cboAgent').getValue();
								};
								delete Post.DATESORTIE;
								Post.DATEENTREE=new Date();
								delete Post.IDAFFECTATION;
								console.log('----');
								console.log(Post);
								console.log('----');
								App.DB.post('sysiphe://affectations',Post,function(r) {
									console.log(r);
									_exit();	
								});
							})
						}
					} else {
						var Post={};
						if (App.get(me.up('window'),'radiogroup#r0').items.items[1].getValue()) Post.IDSYSIPHE=App.get(me.up('window'),'combo#cboAgentS').getValue();
						else Post.IDUTILISATEUR=App.get(me.up('window'),'combo#cboAgent').getValue();
						if ((!Post.IDSYSIPHE) && (!Post.IDUTILISATEUR))
						_exit(); else {
							var MID=App.get(me.up('window'),'textfield#IDMATERIEL').getValue();
							Post.IDMATERIEL=MID;
							Post.IDSTATUT=1;
							Post.DATEENTREE=new Date();
							App.DB.post('sysiphe://affectations',Post,_exit)
						};
					}
				});
			});
		});		
	},
	cboModele_keys: function(me,key) {
		if (key.keyCode==56) {
			try {
				var value=me.getValue().split('!')[0];
			} catch(e) {
				me.setValue('');
				return;
			};
			App.DB.post('sysiphe://modeles',{
				MODELE:value,
				IDFAMILLE: App.get(me.up('window'),'combo#cboFamille').getValue(''),
				IDMARQUE: App.get(me.up('window'),'combo#cboMarque').getValue('') 
			},function(e,r) {
				if (e.insertId) {
					var store=App.store.create('sysiphe://modeles{IDMODELE,MODELE+}?IDMARQUE='+App.get(me.up('window'),'combo#cboMarque').getValue('')+'&IDFAMILLE='+App.get(me.up('window'),'combo#cboFamille').getValue(''),{autoLoad:true});
					me.bindStore(store);
					store.load();
					me.setValue(e.insertId);
				} else me.setRawValue(value);
			});
		}
	},	
	cboMarque_keys: function(me,key) {
		App.get(me.up('window'),'combo#cboModele').setValue('');
		var store=App.store.create({fields:[],data:[]});
		App.get(me.up('window'),'combo#cboModele').bindStore(store);
		if (key.keyCode==56) {
			try {
				var value=me.getValue().split('!')[0];
			} catch(e) {
				me.setValue('');
				return;
			};
			App.DB.post('sysiphe://marques',{MARQUE:value},function(e,r) {
				if (e.insertId) {
					var store=App.store.create('sysiphe://marques{IDMARQUE,MARQUE+}',{autoLoad:true});
					me.bindStore(store);
					store.load();
					me.setValue(e.insertId);
				} else me.setRawValue(value);
			});
		};
	},
	cboFournisseur_keys: function(me,key) {
		if (key.keyCode==56) {
			try {
				var value=me.getValue().split('!')[0];
			} catch(e) {
				me.setValue('');
				return;
			};
			App.DB.post('sysiphe://fournisseurs',{FOURNISSEUR:value},function(e,r) {
				if (e.insertId) {
					var store=App.store.create('sysiphe://fournisseurs{IDFOURNISSEUR,FOURNISSEUR+}',{autoLoad:true});
					me.bindStore(store);
					store.load();
					me.setValue(e.insertId);
				} else me.setRawValue(value);
			});
		};
	},
	cboServ_select: function(me,record) {
		App.get('VAffectation combo#cboAgentS').setValue('');	
		var store=App.store.create("sysiphe://utilisateurs{IDUTILISATEUR,NOMUTILISATEUR+}?IDSERVICE="+me.getValue());
		App.get('VAffectation combo#cboAgentS').bindStore(store);
		store.load();		
	},
	cboUnite_select: function(me,record) {	
		App.get('VAffectation combo#cboSERV').setValue('');
		App.get('VAffectation combo#cboAgentS').setValue('');
		var store=App.store.create('sysiphe://services{IDSERVICE,SERVICE+}?archive=0&idunite='+me.getValue());
		App.get('VAffectation combo#cboSERV').bindStore(store);
		store.load();	
		store.on('load',function(data) {
			if (data.data.items.length==1) {
				App.get('VAffectation combo#cboSERV').setValue(data.data.items[0].data.IDSERVICE);
				App.get('VAffectation combo#cboAgentS').setValue('');	
				var store=App.store.create("sysiphe://utilisateurs{IDUTILISATEUR,NOMUTILISATEUR+}?IDSERVICE="+me.getValue());
				App.get('VAffectation combo#cboAgentS').bindStore(store);
				store.load();
			}	
		})
	},
	up_onclick: function(p, record) {
		App.view.create('VShowDoc', {
			modal: true,
			title: record.data.filename,
			pid: record.data.docId
		}).show().center();			
	},
	new_materiel_click: function(me) {
		App.view.create('VAffectation',{modal:true}).show().center();	
	},
	cboFamille_select: function(me) {
		var store=App.store.create('App.Materiels.getMarques');
		store.getProxy().extraParams.idFamille=me.getValue();
		App.get(me.up('window'),'combo#cboMarque').bindStore(store);
		store.load();
	},
	cboMarque_select: function(me) {
		var store=App.store.create('sysiphe://modeles{IDMODELE,MODELE+}?idfamille='+App.get(me.up('window'),'combo#cboFamille').getValue()+'&idmarque='+App.get(me.up('window'),'combo#cboMarque').getValue());
		App.get(me.up('window'),'combo#cboModele').setValue('');
		App.get(me.up('window'),'combo#cboModele').bindStore(store);
		store.load();		
	},
	VAffectation_show: function(me) {

		if (me._data) {
			var store_archive=App.store.create('App.Materiels.getArchive');
			store_archive.getProxy().extraParams.idmateriel=me._data.IDMATERIEL;
			App.get(me,'grid').bindStore(store_archive);
			store_archive.load();
			App.get(me,'datefield#cboIN').setValue(me._data.DATEENTREE);
			App.get(me,'datefield#cboOUT').setValue(me._data.DATESORTIE);
			App.get(me,'combo#cboFamille').getStore().load();
			App.get(me,'combo#cboFamille').setValue(me._data.IDFAMILLE);
			App.get(me,'combo#cboMarque').getStore().load();
			App.get(me,'combo#cboMarque').setValue(me._data.IDMARQUE);
			App.get(me,'combo#cboModele').getStore().load();
			App.get(me,'combo#cboModele').setValue(me._data.IDMODELE);	
			App.get(me,'combo#cboFournisseur').getStore().load();
			App.get(me,'combo#cboFournisseur').setValue(me._data.IDFOURNISSEUR);	
			App.get(me,'combo#cboGarantie').getStore().load();
			App.get(me,'combo#cboGarantie').setValue(me._data.IDGARANTIE);
			App.get(me,'textfield#Commande').setValue(me._data.NOCOMMANDE);
			App.get(me,'combo#NOINVT').setValue(me._data.NOINVT);
			App.get(me,'combo#NOSERIE').setValue(me._data.NOSERIE);
			App.get(me,'combo#NOFACTURE').setValue(me._data.NOFACTURE);
			App.get(me,'textfield#DATEFACTURE').setValue(me._data.DATEFACTURE);		
			App.get(me,'textfield#IDMATERIEL').setValue(me._data.IDMATERIEL);	
			App.get(me,'textfield#IDAFFECTATION').setValue(me._data.IDAFFECTATION);	
			App.get(me,'htmleditor#NOTESMATERIEL').setValue(me._data.NOTESMATERIEL);
			App.get(me,'datefield#DATEREFORME').setValue(me._data.DATEREFORME);
			if (me._data._BLOB) App.get(me,'uploadfilemanager#up').setFiles(JSON.parse(me._data._BLOB));
			if (me._data.SENSIBLE) App.get(me,'radiogroup#r1').setValue({rc:1});
			if (me._data.REFORME) App.get(me,'checkbox').setValue(me._data.REFORME);
			if (me._data.IDUTILISATEUR==0) {
				App.get(me,'radiogroup').setDisabled(true);

				App.get(me,'combo#cboEts').setDisabled(true);
				App.get(me,'combo#cboDpt').setDisabled(true);
				App.get(me,'combo#cboSrv').setDisabled(true);
				App.get(me,'combo#cboAgent').setDisabled(true);
				App.get(me,'combo#cboUnite').setDisabled(true);
				App.get(me,'combo#cboAgentS').setDisabled(true);
				App.get(me,'combo#cboSERV').setDisabled(true);
				
				App.get(me,'radiogroup#r0').items.items[0].boxLabelEl.update("BPCLight");
				App.get(me,'radiogroup#r0').items.items[1].boxLabelEl.update("<b>Sysiphe</b>");	
				App.get(me,'radiogroup#r0').items.items[1].setValue(true);
				App.get(me,'combo#cboEts').hide();
				App.get(me,'combo#cboDpt').hide();
				App.get(me,'combo#cboSrv').hide();
				App.get(me,'combo#cboAgent').hide();
				App.get(me,'combo#cboUnite').show();
				App.get(me,'combo#cboAgentS').show();	
				App.get(me,'combo#cboSERV').show();
				if (me._data.Affectation!="A ATTRIBUER") {
					var store=App.store.create('sysiphe://utilisateurs');
					App.get(me,'combo#cboAgentS').bindStore(store);
					store.load();					
					App.DB.get('sysiphe://utilisateurs{idunite,idservice}?idutilisateur='+me._data.IDSYSIPHE,function(r) {
						App.get(me,'combo#cboSERV').setValue(r.data[0].idservice);
						App.get(me,'combo#cboUnite').setValue(r.data[0].idunite);
					});
					App.get(me,'combo#cboAgentS').setValue(me._data.IDSYSIPHE);
				};
			} else {
				App.get(me,'combo#cboEts').setDisabled(true);
				App.get(me,'combo#cboDpt').setDisabled(true);
				App.get(me,'combo#cboSrv').setDisabled(true);
				App.get(me,'combo#cboAgent').setDisabled(true);
				App.get(me,'combo#cboUnite').setDisabled(true);
				App.get(me,'combo#cboAgentS').setDisabled(true);
				App.get(me,'combo#cboSERV').setDisabled(true);
				
				App.get(me,'radiogroup#r0').items.items[0].boxLabelEl.update("<b>BPCLight</b>");
				App.get(me,'radiogroup#r0').items.items[1].boxLabelEl.update("Sysiphe");
				App.get(me,'radiogroup#r0').items.items[0].setValue(true);
				App.get(me,'combo#cboEts').show();
				App.get(me,'combo#cboDpt').show();
				App.get(me,'combo#cboSrv').show();
				App.get(me,'combo#cboAgent').show();
				App.get(me,'combo#cboSERV').hide();
				App.get(me,'combo#cboUnite').hide();
				App.get(me,'combo#cboAgentS').hide();
				var store=App.store.create('bpclight://agents{Kage,Kuni,Ksub,Nom,Prenom,Nom+" "+Prenom=NomPrenom+}',{autoLoad:true});
				App.get(me,'combo#cboAgent').bindStore(store);
				store.load();
				store.on('load',function(s) {
					App.DB.get('bpclight://agents{Kuni,Ksub}?kage='+me._data.IDUTILISATEUR,function(r) {
						App.get(me,'combo#cboDpt').getStore().load();
						App.get(me,'combo#cboDpt').setValue(r.data[0].Kuni);
						App.get(me,'combo#cboSrv').getStore().load();
						App.get(me,'combo#cboSrv').setValue(r.data[0].Ksub);
						App.DB.get('bpclight://unites{Kets}?Kuni='+r.data[0].Kuni,function(r) {
							App.get(me,'combo#cboEts').getStore().load();
							App.get(me,'combo#cboEts').setValue(r.data[0].Kets);
						});
					});				
				});
				App.get(me,'combo#cboAgent').setValue(me._data.IDUTILISATEUR);
			}
		} else {
			App.get(me,'combo#cboEts').setValue(1);
			App.get(me,'combo#cboDpt').setValue('');	
			App.get(me,'combo#cboSrv').setValue('');
			App.get(me,'combo#cboAgent').setValue('');
			var store=App.store.create('bpclight://unites{Kuni,LibUnic+}?kets=1&archive=0');
			App.get(me,'combo#cboDpt').bindStore(store);
			store.load();
		}
	},
	radio_change: function(me,value) {
		if (value.rb==1) {
			me.items.items[0].boxLabelEl.update("<b>BPCLight</b>");
			me.items.items[1].boxLabelEl.update("Sysiphe");
			App.get('VAffectation combo#cboEts').show();
			App.get('VAffectation combo#cboDpt').show();
			App.get('VAffectation combo#cboSrv').show();
			App.get('VAffectation combo#cboAgent').show();
			App.get('VAffectation combo#cboUnite').hide();
			App.get('VAffectation combo#cboSERV').hide();
			App.get('VAffectation combo#cboAgentS').hide();
		};
		if (value.rb==2) {
			me.items.items[0].boxLabelEl.update("BPCLight");
			me.items.items[1].boxLabelEl.update("<b>Sysiphe</b>");		
			App.get('VAffectation combo#cboEts').hide();
			App.get('VAffectation combo#cboDpt').hide();
			App.get('VAffectation combo#cboSrv').hide();
			App.get('VAffectation combo#cboAgent').hide();
			App.get('VAffectation combo#cboUnite').show();
			App.get('VAffectation combo#cboSERV').show();
			App.get('VAffectation combo#cboAgentS').show();
		};
	},
	ets_select: function(me) {
		App.get('VAffectation combo#cboDpt').setValue('');	
		App.get('VAffectation combo#cboSrv').setValue('');
		App.get('VAffectation combo#cboAgent').setValue('');
		var store=App.store.create('bpclight://unites{Kuni,LibUnic+}?kets='+me.getValue()+'&archive=0');
		App.get('VAffectation combo#cboDpt').bindStore(store);
		store.load();
	},
	dpt_select: function(me) {
		App.get('VAffectation combo#cboSrv').setValue('');
		App.get('VAffectation combo#cboAgent').setValue('');
		var store=App.store.create('bpclight://subdis{Ksub,LibSubC+}?archive=0&kuni='+me.getValue());
		App.get('VAffectation combo#cboSrv').bindStore(store);
		store.load();
	},
	srv_select: function(me) {
		var store=App.store.create('bpclight://agents{Kage,Nom,Prenom,Nom+" "+Prenom=NomPrenom+}?actif=1&ksub='+me.getValue());
		App.get('VAffectation combo#cboAgent').bindStore(store);
		store.load();
	},	
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			//Ext.Msg.alert('Status', 'Click event on '+p.itemId);
		};			
	},
	grid_select: function(me,dta) {
		//console.log(dta);
		App.view.create('VAffectation',{modal:true,_data:dta.data}).show().center();	
	},
	filter_onclick: function()
	{
		if (App.get('FilterBox#FilterPanel').isVisible()) {
			var store=App.store.create('App.Materiels.getAll',{autoLoad: true,groupField: 'Unite'});
			App.get('mainform grid').bindStore(store);
			store.load();
			App.get('FilterBox#FilterPanel').hide();
			return;
		} else
		App.get('FilterBox#FilterPanel').show();
	},
	onLoad: function()
	{
		App.get('FilterBox#FilterPanel').store=App.get('mainform grid').getStore();
		
	}
	
	
});
