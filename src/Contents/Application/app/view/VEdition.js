App.view.define('VEdition',{
    extend: "Ext.window.Window",
    alias: 'widget.VEdition',
    initComponent: function() {
		
        this.width = 500;
        this.height = 700;

        this.layout = {
            type: 'border'
        };
		
		this.title="Edition";
		
		this.items=[
			
		];
		
		this.callParent();
	}
});