App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
			]		
		},
		{
			xtype: "FilterBox",
			itemId: "FilterPanel",
			fields: [
			]
		},
		{
			region: "center",
			layout: "vbox",
			split:true,
			items: [
				{
					xtype: "grid",
					tbar: [
					'->',
					{
						text: "Filtrer",
						iconCls: "ico-filtre",
						itemId: "filter"
					},
					{
						text: "Exporter",
						iconCls: "ico-export",
						itemId: "export"
					}
					],
					flex: 1,
					width: "100%",
					itemId: "materiels",
					text: "Click me",
					columns: [{
						
					}],
					store: App.store.create('sysiphedb://materiels',{autoLoad: true})
				}
			]
		}
	]
	
});
