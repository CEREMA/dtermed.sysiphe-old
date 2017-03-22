App.view.define('VAffectation',{
    extend: "Ext.window.Window",
    alias: 'widget.VShowFormation',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'fit'
        };
        
		this.bbar = [
            '->', {
                text: 'Quitter',
				itemId: "Exit"
            }
        ];
		
		this.items=[
			
		];
		
		this.callParent();
	}
});