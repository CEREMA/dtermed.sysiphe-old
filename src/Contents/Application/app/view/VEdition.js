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
			store: App.store.create("sysiphe://marques",{autoLoad:true})
		},			
		{
			xtype: "grid",
			title: "Modèles",
			selModel: 'cellmodel',
			tb: "modeles",
			border: false,
			tbar: [
			{
					xtype: "combo",
					itemId: "cboF",
					store: App.store.create('sysiphe://familles',{autoLoad:true}),
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
							var store=App.store.create('sysiphe://modeles?IDFAMILLE='+famille+'&IDMARQUE='+marque);
							me.up('grid').bindStore(store);
							store.load();
						}
					}
			},
			{
					xtype: "combo",
					itemId: "cboM",
					store: App.store.create('sysiphe://marques',{autoLoad:true}),
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
			store: App.store.create("sysiphe://modeles",{autoLoad:false})
		}
		];
		
		this.callParent();
	}
});