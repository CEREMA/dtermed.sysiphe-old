App.view.define('VAffectation',{
    extend: "Ext.window.Window",
    alias: 'widget.VShowFormation',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'border'
        };
		
		this.title="Affectation";
        
		this.bbar = [
            '->', {
                text: '<b>Quitter</b>',
				itemId: "Exit",
				handler: function(me) {
					me.up('window').close();
				}
            }
        ];
		
		this.items=[
		{
			region: "west",
			split: true,
			width: 350,
			title: "Agents",
			layout: "vbox",
			items: [
			{
				xtype: "combo",
				width: "100%",
				itemId: "cboEts",
				padding: 5,
				fieldLabel: "Etablissement",
				labelAlign: "top",
				editable: false,
				store: App.store.create('bpclight://etablissements',{autoLoad:true}),
				displayField: "LibEts",
				valueField: "Kets"
			},
			{
				xtype: "combo",
				itemId: "cboDpt",
				width: "100%",
				padding: 5,
				fieldLabel: "Département",
				labelAlign: "top",
				editable: false,
				store: App.store.create('bpclight://unites'),
				displayField: "LibUnic",
				valueField: "Kuni"				
			},			
			{
				xtype: "combo",
				width: "100%",
				itemId: "cboSrv",
				padding: 5,
				fieldLabel: "Service",
				labelAlign: "top",
				editable: false,
				store: App.store.create('bpclight://subdis'),
				displayField: "LibSubC",
				valueField: "Ksub"				
			}
			]
		},
		{
			region: "center",
			split: true,
			title: "Fiche matériel",
			flex: 1,
			items: [
				
			]
		}
		];
		
		this.callParent();
	}
});