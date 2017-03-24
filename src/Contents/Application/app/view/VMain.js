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
					{
						text: "Replier",
						handler: function(me) {
							me.up('grid').features[0].collapseAll();
						}
					},
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
						width: 200,
						hidden: false
					},{
						header: "Etablissement",
						dataIndex: "Etablissement",
						hidden: true
					},{
						header: "Service",
						dataIndex: "Service",
						hidden: false
					},{
						header: "Inventaire",
						dataIndex: "NOINVT"
					},{
						header: "Série",
						dataIndex: "SN"
					},{
						header: "Famille",
						dataIndex: "FAMILLE",
						width: 200
					},{
						header: "Modèle",
						dataIndex: "modele",
						width: 200
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
