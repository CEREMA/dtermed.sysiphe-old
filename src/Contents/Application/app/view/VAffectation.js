App.view.define('VAffectation',{
    extend: "Ext.window.Window",
    alias: 'widget.VShowFormation',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'border'
        };
		
		this.title="Affectation";
        
		this.bbar = [
            '->', {
                text: '<b>Quitter</b>',
				itemId: "Exit",
				handler: function(me) {
					me.up('window').close();
				}
            }
        ];
		
		this.items=[
		{
			region: "west",
			split: true,
			width: 350,
			items: [
				
			]
		},
		{
			region: "center",
			split: true,
			flex: 1,
			items: [
				
			]
		}
		];
		
		this.callParent();
	}
});