
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component
{   

    onLoad () 
    {           
        cc.director.preloadScene('GameScene');
    }

    start () 
    {
        this.schedule(this.startGame, 5, 0);
    }

    startGame()
    {
        cc.director.loadScene('GameScene');  
    }

    
}
