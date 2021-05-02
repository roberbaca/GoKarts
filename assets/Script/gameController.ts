
const {ccclass, property} = cc._decorator;


export enum GameStatus
{
    // Estados del juego
    Game_Ready = 0,     // ready state
    Game_Playing,       // game playing
    Game_Over           // game Over
}


@ccclass
export default class gameController extends cc.Component 
{
    mainCamera: cc.Camera = null; 

    //Game State
    gameStatus: GameStatus = GameStatus.Game_Ready;  

    @property(cc.Sprite)
    spr_counter: cc.Sprite = null;

    @property(cc.Sprite)
    spr_p: cc.Sprite = null;    

    @property(cc.AudioSource)
    snd_CountDown: cc.AudioSource = null;

    tutorialOver: boolean = false;

    onLoad () 
    {            

       // activamos el sistema de Colisiones
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
         
        // debug draw
        collisionManager.enabledDebugDraw = false;        
    }

    start () 
    {        
        this.spr_counter.getComponent(cc.Animation).play();
        this.snd_CountDown.play();  
        this.schedule(this.countDown, 3, 0);
        this.schedule(this.pIcon, 6, 0);         
    }

    update (dt) 
    {
         
        
    }  

    countDown()
    {
        this.spr_counter.node.active = false;
        this.gameStatus= GameStatus.Game_Playing;  
    }

    pIcon()
    {
        this.spr_p.node.active = false;
    }
    
    
    
}
