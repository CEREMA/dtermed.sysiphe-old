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
			"VAffectation combo#cboEts": {
				select: "ets_select"
			},
			"VAffectation combo#cboDpt": {
				select: "dpt_select"
			},
			"VAffectation combo#cboSrv": {
				select: "srv_select"
			}	
		});
		
		App.init('VMain',this.onLoad);
		
	},
	ets_select: function(me) {
		App.get('VAffectation combo#cboDpt').setValue('');	
		App.get('VAffectation combo#cboSrv').setValue('');
		alert(me.getValue());
		var store=App.store.create('bpclight://unites?kets='+me.getValue()+'&archive=0');
		App.get('VAffectation combo#cboDpt').bindStore(store);
		store.load();
	},
	dpt_select: function(me) {
		App.get('VAffectation combo#cboSrv').setValue('');
		var store=App.store.create('bpclight://subdis?ksub='+me.getValue());
		App.get('VAffectation combo#cboSrv').bindStore(store);
		store.load();
	},
	srv_select: function(me) {

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
	}
	
	
});
