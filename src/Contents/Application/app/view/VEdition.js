App.view.define('VEdition',{
    extend: "Ext.window.Window",
    alias: 'widget.VEdition',
    initComponent: function() {
		
        this.width = 500;
        this.height = 700;
		alert(this.tabledef);

        this.layout = {
            type: 'accordion'
        };
		
		this.title="Edition";
		
		this.items=[
		{
			xtype: "grid",
			title: "Fournisseurs",
			columns: ["ID_Fournisseur","Nom_Fournisseur"],
			store: App.store.create("sysiphe://fournisseurs",{autoLoad:true})
		}
		];
		
		this.callParent();
	}
});