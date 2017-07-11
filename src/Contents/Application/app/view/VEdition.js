App.view.define('VEdition',{
    extend: "Ext.window.Window",
    alias: 'widget.VEdition',
    initComponent: function() {
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        	clicksToMoveEditor: 1,
        	autoCancel: false
    	});
		
        this.width = 500;
        this.height = 700;

        this.layout = {
            type: 'accordion'
        };
		
		this.title = "Edition";
		
		//this.plugins = [rowEditing];
		
		this.items = [
		{
			xtype: "grid",
			title: "Fournisseurs",
			columns: [{
				text: "Fournisseur",
				dataIndex: "FOURNISSEUR",
				editor: {
					allowBlank:false
				}
			}],
			store: App.store.create("sysiphe://fournisseurs",{autoLoad:true})
		}
		];
		
		this.callParent();
	}
});