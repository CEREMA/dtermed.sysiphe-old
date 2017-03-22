App.controller.define('CMain', {

	views: [
		"VMain"
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
			"mainform combo#cboEts": {
				select: "ets_select"
			},
			"mainform combo#cboDpt": {
				select: "dpt_select"
			},
			"mainform combo#cboSrv": {
				select: "srv_select"
			}	
		});
		
		App.init('VMain',this.onLoad);
		
	},
	ets_select: function(me) {
		App.get('mainform combo#cboDpt').setValue('');	
		App.get('mainform combo#cboSrv').setValue('');
		var store=App.store.create('bpclight://unites?kets='+me.getValue());
		App.get('mainform combo#cboDpt').bindStore(store);
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
	}
	
	
});
