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
			title: "Modèles",
			selModel: 'cellmodel',
			tb: "fournisseurs",
			plugins: [{
        		ptype: 'cellediting',
        		clicksToEdit: 1
    		}],
			columns: [{
				text: "Famille",
				dataIndex: "IDFAMILLE",
				editor: {
					xtype: "combo",
					store: App.store.create('sysiphe://familles',{autoLoad:true}),
					displayField: "FAMILLE",
					valueField: "IDFAMILLE"
				}
			},
			{
				text: "Modèle",
				dataIndex: "MODELE",
				editor: {
					allowBlank:false	
				},
				flex: 1
			}],
			store: App.store.create("sysiphe://modeles",{autoLoad:true})
		},
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
		}
		];
		
		this.callParent();
	}
});