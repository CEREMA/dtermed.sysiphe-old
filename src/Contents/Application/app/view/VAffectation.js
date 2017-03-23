App.view.define('VAffectation',{
    extend: "Ext.window.Window",
    alias: 'widget.VAffectation',
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
				layout: "hbox",
				width: "100%",
				padding: 5,
				border: false,
				xtype: "radiogroup",
				defaultType: 'radiofield',
				items: [
        		{boxLabel: '<b>BPCLight</b>', name: 'rb', inputValue: '1', checked: true},
        		{boxLabel: 'Sysiphe', name: 'rb', inputValue: '2',margin:{left: 10}}
				]
			},
			{
				xtype: "combo",
				width: "100%",
				itemId: "cboEts",
				padding: 5,
				fieldLabel: "Etablissement",
				labelAlign: "top",
				editable: false,
				store: App.store.create('bpclight://etablissements{Kets,LibEts}?archive=0',{autoLoad:true}),
				displayField: "LibEts",
				valueField: "Kets"
			},
			{
				layout: "hbox",
				width: "100%",
				items: [
				{
					xtype: "combo",
					itemId: "cboDpt",
					flex: 1,
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
					flex: 1,
					itemId: "cboSrv",
					padding: 5,
					fieldLabel: "Service",
					labelAlign: "top",
					editable: false,
					store: App.store.create('bpclight://subdis'),
					displayField: "LibSubC",
					valueField: "Ksub"				
				}					
				],
				border: false
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