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
						iconCls: "ico-filtre"
					},
					{
						text: "Exporter",
						iconCls: "ico-export"
					}
					],
					flex: 1,
					width: "100%",
					itemId: "materiels",
					text: "Click me",
					margin: 20
				}
			]
		}
	]
	
});
