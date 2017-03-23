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
					plugins: [
						Ext.create('Ext.ux.grid.plugin.GroupingPanel')	
					],
        			features: [Ext.create('Ext.ux.grid.feature.MultiGroupingSummary', {
            id:                     'group',
            hideGroupedHeader:      true,
            enableGroupingMenu:     true,
            startCollapsed:         false
        })],					
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
						header: "LibUnic",
						dataIndex: "LibUnic",
						sortable:       true,
            groupable:      true,
						groupHeaderTpl: 'Project: {name}'
					},{
						header: "LibSubC",
						dataIndex: "LibSubC",
						sortable:       true,
            groupable:      true,
						groupHeaderTpl: 'Project: {name}'
					},{
						header: "Inventaire",
						dataIndex: "NOINVT",
						
					},{
						header: "Série",
						dataIndex: "SN"
					},{
						header: "Notes",
						dataIndex: "NOTESMATERIEL",
						flex: 1
					}],
					store: App.store.create('App.Materiels.getAll',{autoLoad: true,groupers: ['LibUnic', 'LibSubC'],groupField: 'LibUnic'})
				}
			]
		}
	]
	
});
