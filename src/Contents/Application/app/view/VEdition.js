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
		
		this.plugins = [{
        	ptype: 'rowediting',
        	clicksToEdit: 1
    	}];
		
		this.items = [
		{
			xtype: "grid",
			title: "Fournisseurs",
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