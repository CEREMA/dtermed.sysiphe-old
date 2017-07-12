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
			title: "Modèles/Marques",
			layout: "vbox",
			items: [
			{
				xtype: "grid",
				selModel: 'cellmodel',
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
				flex: 1,
				store: App.store.create("sysiphe://marques",{autoLoad:true})				
			},
			{
				xtype: "grid",
				selModel: 'cellmodel',
				plugins: [{
					ptype: 'cellediting',
					clicksToEdit: 1
				}],
				columns: [{
					text: "Modèle",
					dataIndex: "MODELE",
					editor: {
						allowBlank:false	
					},
					flex: 1
				}],
				flex: 1,
				store: App.store.create("sysiphe://modeles",{autoLoad:false})				
			}
			]
		}
		];
		
		this.callParent();
	}
});