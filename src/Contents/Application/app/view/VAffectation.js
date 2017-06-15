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
                text: '<b>Enregistrer</b>',
				itemId: "Exit",
				handler: function(me) {
					me.setDisabled(true);
					function _exit() {
						App.get('mainform grid').getStore().load();
						me.setDisabled(false);	
						me.up('window').close();	
					};
					// update materiels
					App.DB.post('sysiphe://materiels',me.up('window'),function(r) {
						var MID=r.insertId;
						App.Docs.upload(App.get('uploadfilemanager#up').getFiles(),0,function() {
							// Affectations
							var Post={};
							// On charge l'ancienne affectation
							App.DB.get('sysiphe://affectations?IDAFFECTATION='+App.get(me.up('window'),'textfield#IDAFFECTATION').getValue(),function(r) {
								if (r.data.length>0) {
									console.log(r.data);
									r.data=r.data[0];
									var Post=r.data;
									var isUpdate=false;
									if (r.data.IDUTILISATEUR!=App.get(me.up('window'),'combo#cboAgent')) isUpdate=true;
									if (r.data.IDSYSIPHE!=App.get(me.up('window'),'combo#cboAgentS')) isUpdate=true;
									if (isUpdate) {
										// On update l'ancien enregistrement en mettant IDSTATUT=0 et en complétant la date de sortie
										App.DB.post('sysiphe://affectations',{
											IDSTATUT: '0',
											IDAFFECTATION: App.get(me.up('window'),'textfield#IDAFFECTATION').getValue(),
											DATESORTIE: new Date()
										},function(r) {
											// Et on recrée l'enregistrement avec le nouvel utilisateur
											
											if (App.get(me.up('window'),'radiogroup#r0').items.items[1].getValue()) {
												delete Post.IDUTILISATEUR;
												Post.IDSYSIPHE=App.get(me.up('window'),'combo#cboAgentS').getValue();
											} else {
												delete Post.IDSYSIPHE;
												Post.IDUTILISATEUR=App.get(me.up('window'),'combo#cboAgent').getValue();
											};
											delete Post.DATESORTIE;
											Post.DATEENTREE=new Date();
											delete Post.IDAFFECTATION;
											console.log('----');
											console.log(Post);
											console.log('----');
											App.DB.post('sysiphe://affectations',Post,function(r) {
												console.log(r);
												_exit();	
											});
										})
									}
								} else {
									var Post={};
									if (App.get(me.up('window'),'radiogroup#r0').items.items[1].getValue()) Post.IDSYSIPHE=App.get(me.up('window'),'combo#cboAgentS').getValue();
									else Post.IDUTILISATEUR=App.get(me.up('window'),'combo#cboAgent').getValue();
									if ((!Post.IDSYSIPHE) && (!Post.IDUTILISATEUR))
									_exit(); else {
										var MID=App.get(me.up('window'),'textfield#IDMATERIEL').getValue();
										Post.IDMATERIEL=MID;
										Post.IDSTATUT=1;
										Post.DATEENTREE=new Date();
										App.DB.post('sysiphe://affectations',Post,_exit)
									};
								}
							});
						});
					});
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
			tbar: [
			'->',
			{
				text: "Modifier",
				handler: function(me) {
					App.get(me.up('window'),'radiogroup').setDisabled(false);
					App.get(me.up('window'),'combo#cboEts').setDisabled(false);
					App.get(me.up('window'),'combo#cboDpt').setDisabled(false);
					App.get(me.up('window'),'combo#cboSrv').setDisabled(false);
					App.get(me.up('window'),'combo#cboAgent').setDisabled(false);
					App.get(me.up('window'),'combo#cboUnite').setDisabled(false);
					App.get(me.up('window'),'combo#cboAgentS').setDisabled(false);
					App.get(me.up('window'),'combo#cboSERV').setDisabled(false);

					App.get(me.up('window'),'combo#cboEts').setValue(null);
					App.get(me.up('window'),'combo#cboDpt').setValue(null);
					App.get(me.up('window'),'combo#cboSrv').setValue(null);
					App.get(me.up('window'),'combo#cboAgent').setValue(null);
					App.get(me.up('window'),'combo#cboUnite').setValue(null);
					App.get(me.up('window'),'combo#cboAgentS').setValue(null);
					App.get(me.up('window'),'combo#cboSERV').setValue(null);					
				}
			}
			],
			items: [
			{
				xtype: "textfield",
				hidden: true,
				itemId: "IDMATERIEL",
				bindTo: "IDMATERIEL"
			},
			{
				xtype: "textfield",
				hidden: true,
				itemId: "IDAFFECTATION",
				bindTo: "IDAFFECTATION"
			},				
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
				padding: 5,
				items: [
				{
					xtype: "datefield",
					fieldLabel: "Du",
					labelAlign: "top",
					itemId: 'cboIN',
					flex: 1
				},
				{
					xtype: "datefield",
					fieldLabel: "Au",
					labelAlign: "top",
					itemId: 'cboOUT',
					flex: 1,
					margin: {
						left: 10
					}
				}
				]
			},
			{
				xtype: "grid",
				title: "Historique",
				border: false,
				store: App.store.create({fields:[],data:[]}),
				flex: 1,
				margin: {top: 10},
				columns:[{
					header: "Affectation",
					dataIndex: "Affectation",
					flex: 1
				},{
					header: "Date sortie",
					dataIndex: "DATESORTIE",
					renderer: Ext.util.Format.dateRenderer('m/d/Y')
				}],
				width: "100%"
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
				layout: "hbox",
				width: "100%",
				border: false,
				padding: 2,
				items: [
				{
					xtype: "combo",
					fieldLabel: "N° Inventaire",
					bindTo: "NOINVT",
					itemId: "NOINVT",
					labelAlign: "top",
					store: App.store.create('sysiphe://materiels{NOINVT-}'),
					valueField: "NOINVT",
					displayField: "NOINVT",
					flex: 1
				},
				{
					xtype: "combo",
					fieldLabel: "N° Série",
					itemId: "NOSERIE",
					bindTo: "SN",
					labelAlign: "top",	
					store: App.store.create('sysiphe://materiels'),
					valueField: "SN",
					displayField: "SN",
					margin:{left: 2},
					flex: 1
				},
				{
					xtype: "combo",
					fieldLabel: "Facture",
					itemId: "NOFACTURE",
					bindTo: "NOFACTURE",
					store: App.store.create('sysiphe://materiels{NOFACTURE-}'),
					valueField: "NOFACTURE",
					displayField: "NOFACTURE",
					labelAlign: "top",	
					margin:{left: 2},
					flex: 1
				},
				{
					xtype: "datefield",
					fieldLabel: "Date facture",
					itemId: "DATEFACTURE",
					bindTo: "DATEFACTURE",
					labelAlign: "top",					
					margin:{left: 2},
					flex: 1
				}					
				]
			},
			{
				layout:"hbox",
				width: "100%",
				border: false,
				padding: 2,
				items: [
				{
					xtype: "combo",
					store: App.store.create('sysiphe://familles{IDFAMILLE,FAMILLE+}'),
					flex: 1,
					itemId: "cboFamille",
					editable: false,
					displayField: "FAMILLE",
					valueField: "IDFAMILLE",				
					fieldLabel: "Famille",
					labelAlign: "top"
				},
				{
					xtype: "combo",
					store: App.store.create('sysiphe://marques{IDMARQUE,MARQUE+}',{autoLoad:true}),
					flex: 1,
					itemId: "cboMarque",
					editable: false,
					displayField: "MARQUE",
					valueField: "IDMARQUE",				
					fieldLabel: "Marque",
					margin:{left:2},
					labelAlign: "top"
				},
				{
					xtype: "combo",
					store: App.store.create('sysiphe://modeles{IDMODELE,MODELE+}',{autoLoad:true}),
					flex: 1,
					margin:{left:2},
					itemId: "cboModele",
					displayField: "MODELE",
					valueField: "IDMODELE",	
					bindTo: "IDMODELE",
					fieldLabel: "Modèle",
					labelAlign: "top"
				}					
				]
			},
			{
				layout: "hbox",
				width: "100%",
				border: false,
				padding: 2,
				items: [
				{
					xtype: "combo",
					fieldLabel: "Fournisseur",
					store:App.store.create('sysiphe://fournisseurs{IDFOURNISSEUR,FOURNISSEUR+}',{autoLoad:true}),
					displayField: "FOURNISSEUR",
					valueField: "IDFOURNISSEUR",
					bindTo: "IDFOURNISSEUR",
					itemId: "cboFournisseur",
					editable: false,
					labelAlign: "top",					
					flex: 1
				},
				{
					xtype: "textfield",
					fieldLabel: "Bon de commande",
					bindTo: "NOCOMMANDE",
					itemId: "Commande",
					labelAlign: "top",	
					margin:{left: 2},
					flex: 1
				},
				{
					xtype: "combo",
					fieldLabel: "Garantie",
					itemId: "cboGarantie",
					editable: false,
					store:App.store.create('sysiphe://garanties{IDGARANTIE,GARANTIE+}',{autoLoad:true}),
					displayField: "GARANTIE",
					valueField: "IDGARANTIE",	
					bindTo: "IDGARANTIE",
					labelAlign: "top",					
					margin:{left: 2},
					flex: 1
				}					
				]
			},
			{
				layout: "hbox",
				width: "100%",
				padding: 2,
				border: false,
				xtype: "radiogroup",
				
				fieldLabel: "Matériel sensible",
				itemId: "r1",
				defaultType: 'radiofield',
				items: [
        		{boxLabel: 'Oui', name: 'rc', inputValue: '1',bindTo: "SENSIBLE"},
        		{boxLabel: 'Non', name: 'rc', inputValue: '2', checked: true,margin:{left: 10}},
				{xtype: "panel",flex: 1,border: false},
				{boxLabel: 'Réforme', name: 'reforme',xtype: "checkboxfield",bindTo:"REFORME"},
				{
					xtype: "datefield",
					itemId: "DATEREFORME",
					margin: {left: 10},
					bindTo: "DATEREFORME"
				}					
				]
			},				
			{
				fieldLabel: "Commentaires / Observations",
				labelAlign: "top",	
				border:false,
				padding: 2,
				xtype: "htmleditor",
				itemId: "NOTESMATERIEL",
				bindTo: "NOTESMATERIEL",
				flex: 1,
				width: "100%"
			},
			{
				fieldLabel: "Pièce(s) jointe(s)",
				labelAlign: "top",	
				border: false,
				xtype: "uploadfilemanager",
				itemId: "up",
				bindTo:"_BLOB",
				flex: 1,
				width: "100%"
			}
			]
		}
		];
		
		this.callParent();
	}
});