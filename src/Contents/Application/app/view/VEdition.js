App.view.define('VEdition',{
    extend: "Ext.window.Window",
    alias: 'widget.VEdition',
    initComponent: function() {
		
        this.width = 500;
        this.height = 700;
		alert(this.tabledef);

        this.layout = {
            type: 'fit'
        };
		
		this.title="Edition";
		
		this.items=[
		{
			xtype: "grid",
			columns: [],
			store: App.store.create({fields:[],data:[]})
		}
		];
		
		this.callParent();
	}
});