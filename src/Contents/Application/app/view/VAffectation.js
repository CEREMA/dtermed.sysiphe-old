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
				itemId: "r0",
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
					store: App.store.create('bpclight://unites?archive=0'),
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
					store: App.store.create('bpclight://subdis?archive=0'),
					displayField: "LibSubC",
					valueField: "Ksub"				
				}					
				],
				border: false
			},
			{
				xtype: "combo",
				width: "100%",
				itemId: "cboAgent",
				padding: 5,
				fieldLabel: "Agent",
				labelAlign: "top",
				editable: false,
				store: App.store.create('bpclight://agents{Kage,Nom,Prenom,Nom+" "+Prenom=NomPrenom+}?actif=1',{autoLoad:false}),
				displayField: "NomPrenom",
				valueField: "Kage"
			},
			{
				layout:"hbox",
				border: false,
				width: "100%",
				items: [
				{
					xtype: "combo",
					flex:1,
					itemId: "cboUnite",
					padding: 5,
					fieldLabel: "Unité",
					labelAlign: "top",
					editable: false,
					store: App.store.create('sysiphe://unites{IDUNITE,UNITE+}?archive=0',{autoLoad:true}),
					displayField: "UNITE",
					valueField: "IDUNITE",
					hidden: true
				},					
				{
					xtype: "combo",
					flex:1,
					itemId: "cboSERV",
					padding: 5,
					fieldLabel: "Service",
					labelAlign: "top",
					editable: false,
					store: App.store.create('sysiphe://services{IDSERVICE,SERVICE+}?archive=0',{autoLoad:true}),
					displayField: "SERVICE",
					valueField: "IDSERVICE",
					hidden: true
				}				
				]	
			},
			{
				xtype: "combo",
				width: "100%",
				itemId: "cboAgentS",
				padding: 5,
				fieldLabel: "Affectation",
				labelAlign: "top",
				editable: false,
				store: App.store.create('sysiphe://utilisateurs{IDUTILISATEUR,NOMUTILISATEUR+}',{autoLoad:true}),
				displayField: "NOMUTILISATEUR",
				valueField: "IDUTILISATEUR",
				hidden: true
			},
			{
				layout: "hbox",
				width: "100%",
				border: false,
				items: [
				{
					xtype: "datefield",
					fieldLabel: "Du",
					labelAlign: "top"				
				},
				{
					xtype: "datefield",
					fieldLabel: "Au",
					labelAlign: "top"					
				}
				]
			}
			]
		},
		{
			region: "center",
			split: true,
			title: "Fiche matériel",
			layout: "vbox",
			flex: 1,
			items: [
			{
				layout:"hbox",
				width: "100%",
				border: false,
				padding: 2,
				items: [
				{
					xtype: "combo",
					store: App.store.create('sysiphe://familles'),
					displayField: "FAMILLE",
					valueField: "IDFAMILLE",				
					fieldLabel: "Famille",
					labelAlign: "top"
				},
				{
					xtype: "combo",
					store: App.store.create('sysiphe://marques'),
					displayField: "MARQUE",
					valueField: "IDMARQUE",				
					fieldLabel: "Marque",
					labelAlign: "top"
				},
				{
					xtype: "combo",
					store: App.store.create('sysiphe://modeles'),
					displayField: "MODELE",
					valueField: "IDMODELE",				
					fieldLabel: "Modèle",
					labelAlign: "top"
				}					
				]
			},
			{
				fieldLabel: "Commentaires / Observations",
				labelAlign: "top",	
				border:false,
				padding: 2,
				xtype: "htmleditor",
				flex: 1,
				width: "100%"
			},
			{
				fieldLabel: "Pièce(s) jointe(s)",
				labelAlign: "top",	
				border: false,
				xtype: "uploadfilemanager",
				flex: 1,
				width: "100%"
			}
			]
		}
		];
		
		this.callParent();
	}
});