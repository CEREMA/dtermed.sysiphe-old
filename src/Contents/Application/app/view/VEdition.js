App.view.define('VEdition',{
    extend: "Ext.window.Window",
    alias: 'widget.VEdition',
    initComponent: function() {
		
        this.width = 500;
        this.height = 700;

        this.layout = {
            type: 'accordion'
        };
		
		this.title="Edition";
		
		this.items=[
		{
			xtype: "grid",
			title: "Fournisseurs",
			columns: [{
				text: "ID_Fournisseur"
			},{
				text: "Nom_Fournisseur"	
			}],
			store: App.store.create("sysiphe://fournisseurs",{autoLoad:true})
		}
		];
		
		this.callParent();
	}
});