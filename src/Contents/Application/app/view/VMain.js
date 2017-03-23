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
			region: "north", 
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
        			features: [{
						ftype: 'groupingsummary',
						groupHeaderTpl: '{name}',
						hideGroupedHeader: false,
						enableGroupingMenu: true
        			}],					
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
					columns: [{
						header: "Inventaire",
						dataIndex: "NOINVT"
					},{
						header: "Série",
						dataIndex: "SN"
					},{
						header: "Notes",
						dataIndex: "NOTESMATERIEL",
						flex: 1
					}],
					store: App.store.create('App.Materiels.getAll',{autoLoad: true,groupField: 'LibUnic'})
				}
			]
		}
	]
	
});
