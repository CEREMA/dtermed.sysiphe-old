App.controller.define('CMain', {

	views: [
		"VMain",
		"VAffectation"
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
				select: "cboFamille_select"	
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	new_materiel_click: function(me) {
		App.view.create('VAffectation',{modal:true}).show().center();	
	},
	cboFamille_select: function(me) {
		var store=App.store.create('sysiphe://modeles{IDMODELE,MODELE+}?idfamille='+App.get(me.up('window'),'combo#cboFamille').getValue()+'&idmarque='+App.get(me.up('window'),'combo#cboMarque').getValue());
		App.get(me.up('window'),'combo#cboModele').setValue('');
		App.get(me.up('window'),'combo#cboModele').bindStore(store);
		store.load();
	},
	VAffectation_show: function(me) {
		console.log(me._data);
		if (me._data) {
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
			App.get(me,'textfield#NOINVT').setValue(me._data.NOINVT);
			App.get(me,'textfield#NOSERIE').setValue(me._data.NOSERIE);
			App.get(me,'textfield#NOFACTURE').setValue(me._data.NOFACTURE);
			App.get(me,'textfield#DATEFACTURE').setValue(me._data.DATEFACTURE);		
			App.get(me,'textfield#IDMATERIEL').setValue(me._data.IDMATERIEL);	
			App.get(me,'htmleditor#NOTESMATERIEL').setValue(me._data.NOTESMATERIEL);
			if (me._data.SENSIBLE) App.get(me,'radiogroup#r1').setValue({rc:1});
			alert(me._data.SENSIBLE);
			if (me._data.IDUTILISATEUR==0) {
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
					//					
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
		//App.get('FilterBox#FilterPanel').store=App.get('grid#GridAgents').getStore();
		if (App.get('FilterBox#FilterPanel').isVisible())
		App.get('FilterBox#FilterPanel').hide();
		else
		App.get('FilterBox#FilterPanel').show();
	},
	onLoad: function()
	{
		App.get('mainform grid').getStore().on('load',function(r) {
			console.log(r);
		})
		
	}
	
	
});
