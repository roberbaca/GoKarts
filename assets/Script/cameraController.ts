cc.Class({
    extends: cc.Component,

    properties: 
    {
        Player_Node:cc.Node,
    },


    update (dt) 
    {

        let target_position = this.Player_Node.getPosition();

        //target_position.y = cc.misc.clampf(target_position.y,-2000, 2000);

        //target_position.x = cc.misc.clampf(target_position.y,-2000, 2000);

        //let current_position = this.node.getPosition();

        //current_position.lerp( target_position , 0.1 , current_position );

        //this.node.setPosition(current_position);   

        this.node.setPosition(target_position);       

    },

});