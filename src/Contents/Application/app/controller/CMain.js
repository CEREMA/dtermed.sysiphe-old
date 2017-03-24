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
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	VAffectation_show: function(me) {
		console.log(me._data);
		if (me._data) {
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
				App.get(me,'combo#cboAgentS').getStore().load();
				var store=App.store.create('sysiphe://utilisateurs');
				App.get(me,'combo#cboAgentS').bindStore(store);
				store.load();
				if (me._data.Affectation!="A ATTRIBUER") {
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
