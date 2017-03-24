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
						header: "Affectation",
						dataIndex: "Affectation",
						hidden: true
					},{
						header: "Etablissement",
						dataIndex: "LibEts",
						hidden: true
					},{
						header: "Département",
						dataIndex: "LibUnic",
						hidden: true
					},{
						header: "Unité",
						dataIndex: "_UNITE"
					},{
						header: "Service",
						dataIndex: "LibSubC"
					},{
						header: "Inventaire",
						dataIndex: "NOINVT"
					},{
						header: "Série",
						dataIndex: "SN"
					},{
						header: "Date Livraison",
						dataIndex: "DATELIVRAISON",
						renderer: Ext.util.Format.dateRenderer('m/d/Y'),
						flex: 1
					},{
						header: "Notes",
						dataIndex: "NOTESMATERIEL",
						flex: 1
					},{
						header: "Notes",
						dataIndex: "NOTESMATERIEL",
						flex: 1
					}],
					store: App.store.create('App.Materiels.getAll',{autoLoad: true,groupField: 'Unite'})
				}
			]
		}
	]
	
});
