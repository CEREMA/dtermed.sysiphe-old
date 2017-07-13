App.view.define('VEdition',{
    extend: "Ext.window.Window",
    alias: 'widget.VEdition',
    initComponent: function() {
		
        this.width = 500;
        this.height = 700;

        this.layout = {
            type: 'accordion'
        };
		
		this.title = "Edition";
		
		this.items = [
		{
			xtype: "grid",
			title: "Fournisseurs",
			selModel: 'cellmodel',
			tb: "fournisseurs",
			border: false,
			bbar:[
			{
				text: "Ajouter",
				iconCls: "ico_plus",
				handler: function(me) {
					var rowEditing=me.up('grid').plugins[0];
					App.DB.get('sysiphe://@'+me.up('grid').tb,function(r) {
						var e={};
						for (var i=0;i<r.data.length;i++) {
							e[r.data[i].COLUMN_NAME]='';
						};
						me.up('grid').getStore().insert(0, e);
						rowEditing.startEdit (0, 0);
					});
				}
			},
			'->',
			{
				text: "Supprimer",
				iconCls: "ico_minus",
				handler: function(me) {	
					var selection = me.up('grid').getSelectionModel().getSelection()[0];
					
					App.DB.get('sysiphe://@'+me.up('grid').tb,function(r) {
						var key="";
						for (var i=0;i<r.data.length;i++) {
							if (r.data[i].COLUMN_KEY=="PRI") key=r.data[i].COLUMN_NAME;
						};
						var value=selection.data[key];
						
						App.DB.del('sysiphe://'+me.up('grid').tb,[value],function(r) {
							me.up('grid').getStore().load();
							App.get('VAffectation combo#cboFournisseur').getStore().load();
							App.get('VAffectation combo#cboModele').getStore().load();
							App.get('VAffectation combo#cboMarque').getStore().load();
							App.get(me.up('grid').up('window'),'combo#cboM').getStore().load();
							App.get(me.up('grid').up('window'),'combo#cboF').getStore().load();
						});
					});
					console.log(selection);
				}
			}
			],
			plugins: [{
        		ptype: 'cellediting',
        		clicksToEdit: 1
    		}],
			columns: [{
				text: "Fournisseur",
				dataIndex: "FOURNISSEUR",
				editor: {
					allowBlank:false	
				},
				flex: 1
			}],
			store: App.store.create("sysiphe://fournisseurs",{autoLoad:true})
		},
		{
			xtype: "grid",
			title: "Marques",
			selModel: 'cellmodel',
			tb: "marques",
			border: false,
			bbar:[
			{
				text: "Ajouter",
				iconCls: "ico_plus",
				handler: function(me) {
					var rowEditing=me.up('grid').plugins[0];
					App.DB.get('sysiphe://@'+me.up('grid').tb,function(r) {
						var e={};
						for (var i=0;i<r.data.length;i++) {
							e[r.data[i].COLUMN_NAME]='';
						};
						me.up('grid').getStore().insert(0, e);
						rowEditing.startEdit (0, 0);
					});
				}
			},
			'->',
			{
				text: "Supprimer",
				iconCls: "ico_minus",
				handler: function(me) {	
					var selection = me.up('grid').getSelectionModel().getSelection()[0];
					
					App.DB.get('sysiphe://@'+me.up('grid').tb,function(r) {
						var key="";
						for (var i=0;i<r.data.length;i++) {
							if (r.data[i].COLUMN_KEY=="PRI") key=r.data[i].COLUMN_NAME;
						};
						var value=selection.data[key];
						
						App.DB.del('sysiphe://'+me.up('grid').tb,[value],function(r) {
							me.up('grid').getStore().load();
							App.get('VAffectation combo#cboFournisseur').getStore().load();
							App.get('VAffectation combo#cboModele').getStore().load();
							App.get('VAffectation combo#cboMarque').getStore().load();
							App.get(me.up('grid').up('window'),'combo#cboM').getStore().load();
							App.get(me.up('grid').up('window'),'combo#cboF').getStore().load();
						});
					});
					console.log(selection);
				}
			}	
			],			
			plugins: [{
        		ptype: 'cellediting',
        		clicksToEdit: 1
    		}],
			columns: [{
				text: "Marque",
				dataIndex: "MARQUE",
				editor: {
					allowBlank:false	
				},
				flex: 1
			}],
			store: App.store.create("sysiphe://marques{IDMARQUE,MARQUE+}",{autoLoad:true})
		},			
		{
			xtype: "grid",
			title: "Modèles",
			selModel: 'cellmodel',
			tb: "modeles",
			border: false,
			bbar: [
			{
				text: "Ajouter",
				iconCls: "ico_plus",
				handler: function(me) {
					var rowEditing=me.up('grid').plugins[0];
					App.DB.get('sysiphe://@'+me.up('grid').tb,function(r) {
						var e={};
						for (var i=0;i<r.data.length;i++) {
							e[r.data[i].COLUMN_NAME]='';
						};
						me.up('grid').getStore().insert(0, e);
						rowEditing.startEdit (0, 0);
					});
				}
			},
			'->',
			{
				text: "Supprimer",
				iconCls: "ico_minus",
				handler: function(me) {	
					var selection = me.up('grid').getSelectionModel().getSelection()[0];
					
					App.DB.get('sysiphe://@'+me.up('grid').tb,function(r) {
						var key="";
						for (var i=0;i<r.data.length;i++) {
							if (r.data[i].COLUMN_KEY=="PRI") key=r.data[i].COLUMN_NAME;
						};
						var value=selection.data[key];
						
						App.DB.del('sysiphe://'+me.up('grid').tb,[value],function(r) {
							me.up('grid').getStore().load();
							App.get('VAffectation combo#cboFournisseur').getStore().load();
							App.get('VAffectation combo#cboModele').getStore().load();
							App.get('VAffectation combo#cboMarque').getStore().load();
							App.get(me.up('grid').up('window'),'combo#cboM').getStore().load();
							App.get(me.up('grid').up('window'),'combo#cboF').getStore().load();
						});
					});
					console.log(selection);
				}
			}],
			tbar: [
			{
					xtype: "combo",
					itemId: "cboF",
					store: App.store.create('sysiphe://familles{IDFAMILLE,FAMILLE+}',{autoLoad:true}),
					displayField: "FAMILLE",
					valueField: "IDFAMILLE",
					fieldLabel: "Famille",
					labelAlign: "top",
					editable: false,
					padding: 5,
					listeners: {
						select: function(me) {
							var famille=me.getValue();
							var marque=App.get("VEdition combo#cboM").getValue();
							if (!marque) return;
							var store=App.store.create('sysiphe://modeles{IDMODELE,MODELE+}?IDFAMILLE='+famille+'&IDMARQUE='+marque);
							me.up('grid').bindStore(store);
							store.load();
						}
					}
			},
			{
					xtype: "combo",
					itemId: "cboM",
					store: App.store.create('sysiphe://marques{IDMARQUE,MARQUE+}',{autoLoad:true}),
					displayField: "MARQUE",
					valueField: "IDMARQUE",
					fieldLabel: "Marque",
					labelAlign: "top",
					editable: false,
					padding: 5,
					listeners: {
						select: function(me) {
							var famille=App.get("VEdition combo#cboF").getValue();
							var marque=me.getValue();
							if (!famille) return;
							var store=App.store.create('sysiphe://modeles{IDMODELE,MODELE+}?IDFAMILLE='+famille+'&IDMARQUE='+marque);
							me.up('grid').bindStore(store);
							store.load();
						}
					}
			}
			],
			plugins: [{
        		ptype: 'cellediting',
        		clicksToEdit: 1
    		}],
			columns: [
			{
				text: "Modèle",
				dataIndex: "MODELE",
				editor: {
					allowBlank:false	
				},
				flex: 1
			}],
			store: App.store.create("sysiphe://modeles{IDMODELE,MODELE+}",{autoLoad:false})
		}
		];
		
		this.callParent();
	}
});