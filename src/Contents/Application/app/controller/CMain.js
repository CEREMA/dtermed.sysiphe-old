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
			"VAffectation radiogroup": {
				change: "radio_change"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	VAffectation_show: function(me) {
		App.get(me,'combo#cboEts').setValue(1);
		App.get('VAffectation combo#cboDpt').setValue('');	
		App.get('VAffectation combo#cboSrv').setValue('');
		App.get('VAffectation combo#cboAgent').setValue('');
		var store=App.store.create('bpclight://unites{Kuni,LibUnic+}?kets=1&archive=0');
		App.get('VAffectation combo#cboDpt').bindStore(store);
		store.load();		
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
			Ext.Msg.alert('Status', 'Click event on '+p.itemId);
		};			
	},
	grid_select: function() {
		App.view.create('VAffectation',{modal:true}).show().center();	
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
		// form loaded	
		App.store.createColumns(App.get("mainform grid"),function(cb) {
			
		});
		var store = grid.getStore();
		store.on('load', function (data) {
			var model = data.model.getFields();
			console.log(model);
		});
	}
	
	
});
